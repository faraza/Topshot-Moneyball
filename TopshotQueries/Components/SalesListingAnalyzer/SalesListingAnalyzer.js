const DataQueries = require('../DataQueries/DataQueries')

module.exports = class SalesListingAnalyzer{   
    
    /**
     * Checks all sales listings within each moment to see if there is one that is SIGNIFICANTLY
     * lower than all of the other ones in price. 
     * 
     * We define significant as 50% or lower.
     * //TODO: Make the threshold a parameter
     */
    async getLowOutliersForAllMoments(){        
        const outlierPercentThreshold = .5;

        const salesListingMap =  await DataQueries.getRecentSalesListingsGroupedByMoment()        

        let allLowOutlierData;

        for(const [cardID, listings] of Object.entries(salesListingMap)){
            let outlierData = this.analyzeListingsForOutliers(listings);
            outlierData.cardID = cardID;
            if(outlierData.percentFromCheapestToSecondCheapest < outlierPercentThreshold)
                allLowOutlierData.push(outlierData);
        }

        return allLowOutlierData;
    }

    getHistoryOfCheapestListingForMoment(momentID){
        console.log("SalesListingAnalyzer::getHistoryOfCheapestListingForMoment: " + momentID);
        //TODO
    }

    analyzeListingsForOutliers(listings){
        let listingAnalysis;
        let cheapestListing, secondCheapestListing;

        if(listings.length() < 3){
            listingAnalysis.percentFromCheapestToSecondCheapest = 100000;
            return listingAnalysis;
        }

        for(listing in listings){
            if(cheapestListing == null)
                cheapestListing = listing;
            else if(secondCheapestListing == null)
                secondCheapestListing = listing;
            else{
                if(listing.price < cheapestListing.price){
                    secondCheapestListing = cheapestListing;
                    cheapestListing = listing;
                }
                else if(listing.price < secondCheapestListing.price){
                    secondCheapestListing = listing;
                }
            }
        }

        listingAnalysis.percentFromCheapestToSecondCheapest = (cheapestListing.price.toFixed(2))/(secondCheapestListing.price.toFixed(2));
        listingAnalysis.cheapestListing = cheapestListing;
        
        return listingAnalysis;
    }
}