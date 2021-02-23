const BlockchainQuerier = require('./BlockchainQuerier')
const { Pool, Client } = require("pg")


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class MarginTradeNotifier {

    recentPurchaseHistory = {};

    client = new Client({
        user: "postgres",
        host: "35.235.64.237",
        database: "topshot",
        password: "root",
    });

    constructor() {
        this.client.connect();
    }

    getCardIDFromTokenIDs(tokenIds) {
        return new Promise((resolve) => {
            if (tokenIds.length === 0) return resolve([])
            const ids = tokenIds.map(id => `'${id}'`)
            const query = `SELECT * from moment_map WHERE tokenid IN(${ids.join(",")})`;
            this.client.query(query, (err, res) => {
                resolve(res.rows)
            });
        })
    }

    async convertTokenIDToPlayID(tokenIds) {
        const rows = await this.getCardIDFromTokenIDs(tokenIds);
        const matches = {}
        rows.forEach(r => {
            const key = `${r.name}-${r.momentdate}-${r.season}-${r.playcategory}-${r.set}`;
            matches[r.tokenid] = key;
        })
        return matches
    }



    async run() {
        let blockchain = new BlockchainQuerier();

        let numberOfLoops = 0;
        while (true) {
            let timeInMS = 1000;
            await sleep(timeInMS)

            let recentListings = await blockchain.getFakeSalesListings();//await blockchain.getMostRecentSalesListings();
            recentListings = await this.addPlayIDToRecentListings(recentListings);
            let recentPurchases = await blockchain.getFakeRecentTransactions();//await blockchain.getMostRecentTransactions();
            recentPurchases = await this.addPlayIDToRecentPurchases(recentPurchases);
            const misses = recentPurchases.filter(p => p.playID == null).map(p => ({
                id: p.seller_id,
                price: p.price
            }));

            const prices = recentPurchases.filter(p => p.playID != null).map(p => p.price);

            if (recentPurchases.length > 0 || recentListings.length > 0) {
                console.log("miss seller_ids", misses)
                console.log("prices", prices)
                this.updateRecentPurchaseHistory(recentPurchases)
                let outlierListings = this.getOutlierListings(recentListings);
                console.log("Outlier listings length: " + outlierListings + " Number of loops: " + numberOfLoops++)
                console.log(outlierListings)
            }

        }
    }

    /**
     * 
     * @param {*} recentListings 
     * 
     *   
    {
    block_height: 12163825,
    moment_id: 1580880,
    price: 120,
    seller_id: '0x5449bc0d74789408'
    }
     * 
     */
    async addPlayIDToRecentListings(recentListings) {
        const tokenIDs = recentListings.map(r => r.moment_id)
        const playIDs = await this.convertTokenIDToPlayID(tokenIDs)

        const newMap = recentListings.map(r => {
            r['playID'] = playIDs[r['moment_id']]
            return r;
        })
        return newMap
    }
    /**
     * 
     * @param {*} recentPurchases 
     * 
     * {
        block_height: 12163889,
        moment_id: 1455471,
        price: 67,
        seller_id: '0x79726c42ff757788'
      }
     */
    async addPlayIDToRecentPurchases(recentPurchases) {
        const tokenIDs = recentPurchases.map(r => r.moment_id)
        const playIDs = await this.convertTokenIDToPlayID(tokenIDs)

        const newMap = recentPurchases.map(r => {
            r['playID'] = playIDs[r['moment_id']]
            return r;
        })
        return newMap
    }

    updateRecentPurchaseHistory(recentPurchases) {
        let numWithPlayIDs = 0;
        let numWithNullIds = 0;
        recentPurchases.forEach(purchase => {
            if (purchase.playID == null) {
                numWithNullIds++;
            } else {
                numWithPlayIDs++;

                if (this.recentPurchaseHistory[purchase.playID] == null) {
                    this.recentPurchaseHistory[purchase.playID] = [purchase];
                }
                else if (this.recentPurchaseHistory[purchase.playID].length >= 15) {
                    this.recentPurchaseHistory[purchase.playID].shift();
                    this.recentPurchaseHistory[purchase.playID].push(purchase);
                } else {
                    this.recentPurchaseHistory[purchase.playID].push(purchase);
                }
            }
        })

        console.log("Purchase check - Num hits: " + numWithPlayIDs + " num misses: " + numWithNullIds);
    }

    getOutlierListings(recentListings) {
        let outlierListings = [];        
        
        for (let i = 0; i < recentListings.length; i++) {
            let listing = recentListings[i];            
            if (listing.playID == null) continue;            
            listing.purchaseHistory = this.recentPurchaseHistory[listing.playID];
            listing = this.analyzeListingForOutlier(listing)
            if (listing.isLowOutlier)
                outlierListings.push(listing);
        }

        return outlierListings;
    }

    analyzeListingForOutlier(listing) {
        listing.isLowOutlier = false;

        if (this.recentPurchaseHistory[listing.playID] == null) return listing;
        if (this.recentPurchaseHistory[listing.playID].length === 0) return listing;

        let outlierThreshold = .9;
        
        let cheapestPurchasePrice = this.recentPurchaseHistory[listing.playID][0];

        for (let i =0; i < this.recentPurchaseHistory[listing.playID].length; i++) {
            let purchase = this.recentPurchaseHistory[listing.playID][i];
            if (purchase.price < cheapestPurchasePrice)
                cheapestPurchasePrice = purchase.price;
        }

        console.log(listing)
        console.log(this.recentPurchaseHistory[listing.playID])

        listing.cheapestRecentPurchasePrice = cheapestPurchasePrice;
        if (listing.price > cheapestPurchasePrice * outlierThreshold) {
            listing.isLowOutlier = false;
        }
        else
            listing.isLowOutlier = true;

        return listing;
    }
}

let runner = new MarginTradeNotifier();
runner.run();