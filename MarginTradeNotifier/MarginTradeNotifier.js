const BlockchainQuerier = require('./BlockchainQuerier')

class MarginTradeNotifier{
    
    recentPurchaseHistory = {};


    async convertTokenIDToPlayID(tokenID){
        //TODO: Bryan
    }


    async run() {
        let blockchain = new BlockchainQuerier();

        while (true) {
            let timeInMS = 1000;
            const recentListings = await blockchain.getMostRecentSalesListings(timeInMS);
            recentListings = await addPlayIDToRecentListings(recentListings);
            const recentPurchases = await blockchain.getMostRecentTransactions(timeInMS);

            updateRecentPurchaseHistory(recentPurchases)
            let outlierListings = getOutlierListings(recentListings);

            console.log("Outlier listing")
        }
    }

    async addPlayIDToRecentListings(recentListings){
        //TODO
        //for each in recentListing set its playID attribute to the correct thing
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
            listing = analyzeListingForOutlier(listing)
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


run()