const BlockchainQuerier = require('./BlockchainQuerier')

class MarginTradeNotifier{
    
    recentPurchaseHistory = {};

    getCardIDFromTokenIDs(tokenIds) {
        return new Promise((resolve) => {
            const ids = tokenIds.map(id => `'${id}'`)
            const query = `SELECT * from moment_map WHERE tokenid IN(${ids.join(",")})`;
            client.query(query, (err, res) => {
                resolve(res.rows)
                client.end();
            });
        })
    }

    async convertTokenIDToPlayID(tokenIds){
        const rows = await this.getCardIDFromTokenIDs(tokenIds);
        console.log('rows', rows)
        const matches = {}
        rows.forEach(r => {
            const key = `${r.name}-${r.momentdate}-${r.season}-${r.playcategory}-${r.set}`;
            matches[r.tokenid] = key;
        })
        console.log('matches', matches)
        return matches
    }


    async run() {
        let blockchain = new BlockchainQuerier();

        let numberOfLoops = 0;
        while (true) {
            let timeInMS = 1000;
            let recentListings = await blockchain.getMostRecentSalesListings(timeInMS);
            recentListings = await this.addPlayIDToRecentListings(recentListings);
            let recentPurchases = await blockchain.getMostRecentTransactions(timeInMS);
            recentPurchases = this.addPlayIDToRecentPurchases(recentPurchases);


            this.updateRecentPurchaseHistory(recentPurchases)
            let outlierListings = this.getOutlierListings(recentListings);

            console.log("Outlier listings length: " + outlierListings + " Number of loops: " + numberOfLoops++)
            console.log(outlierListings)
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
    async addPlayIDToRecentListings(recentListings){
        
        //TODO
        //for each in recentListing set its playID attribute to the correct thing
        tokenIDs = recentListings.map(r => r.moment_id)
        const playIDs = this.convertTokenIDToPlayID(tokenIDs)
        return recentListings.map(r => r['playID'] = playIDs[r['moment_id']])
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
    async addPlayIDToRecentPurchases(recentPurchases){
        //TODO
        tokenIDs = recentPurchases.map(r => r.moment_id)
        const playIDs = this.convertTokenIDToPlayID(tokenIDs)
        return recentPurchases.map(r => r['playID'] = playIDs[r['moment_id']])
    }

    updateRecentPurchaseHistory(recentPurchases){
        for(purchase in recentPurchases){
            if(recentPurchaseHistory[purchase.playID] == null){
                recentPurchaseHistory[purchase.playID] = purchase;
            }
            else if(recentPurchaseHistory[purchase.playID].length >= 15){
                recentPurchaseHistory[purchase.playID].shift();
                recentPurchaseHistory[purchase.playID].push(purchase);
            }
            else{
                recentPurchaseHistory[purchase.playID].push(purchase);
            }
        }        
    }

    getOutlierListings(recentListings){
        let outlierListings;

        for (listing in recentListings){
            listing.purchaseHistory = recentPurchaseHistory[listing.playID];
            listing = this.analyzeListingForOutlier(listing)
            if(listing.isLowOutlier)
                outlierListings.push(listing);
        }

        return outlierListings;
    }

    analyzeListingForOutlier(listing){  
        listing.isLowOutlier = false;   
        if(this.recentPurchaseHistory[listing.playID] == null) return listing;
        if(this.recentPurchaseHistory[listing.playID].length === 0) return listing;

        let outlierThreshold = .8;
        let cheapestPurchasePrice = 10000000000000000;

        for(purchase in recentPurchaseHistory[listing.playID]){            
            if(purchase.price < cheapestPurchasePrice)
                cheapestPurchasePrice = purchase.price;
        }        

        listing.cheapestRecentPurchasePrice = cheapestPurchasePrice;
        if(listing.price > cheapestPurchasePrice*outlierThreshold){
            listing.isLowOutlier = false;
        }
        else
            listing.isLowOutlier = true;
            
        return listing;
    }
}

let runner = new MarginTradeNotifier();
runner.run();