const DataQueries = require('../DataQueries/DataQueries')

module.exports = class SalesListingAnalyzer{   
    
    /**
     * Checks all sales listings within each moment to see if there is one that is SIGNIFICANTLY
     * lower than all of the other ones in price. 
     * 
     * We define significant as 50% or lower.
     * //TODO: Make the threshold a parameter
     */
    getLowOutliersForAllMoments(){
        const outlierPercentThreshold = .5;

        const allMomentListings =  DataQueries.getAllActiveSalesListingsGroupedByMoment();

        let outlierMomentListings = [];
        for(singleMomentListings in allMomentListings){
            singleMomentListings = this.analyzeMomentListingsForOutliers(singleMomentListings);
            if(singleMomentListings.percentFromCheapestToSecondCheapest < outlierPercentThreshold)
                outlierMomentListings.push(singleMomentListings);
        }

        return outlierMomentListings;
    }

    getHistoryOfCheapestListingForMoment(momentID){
        console.log("SalesListingAnalyzer::getHistoryOfCheapestListingForMoment: " + momentID);
        //TODO
    }

    analyzeMomentListingsForOutliers(momentListings){
        let cheapestListing, secondCheapestListing;

        for(listing in momentListings.listings){
            if(cheapestListing === null)
                cheapestListing = listing;
            else if(secondCheapestListing === null)
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

        if(momentListings.listings.length() < 10)
            momentListings.percentFromCheapestToSecondCheapest = 100000;            
        else{
            momentListings.percentFromCheapestToSecondCheapest = (cheapestListing.price.toFixed(2))/(secondCheapestListing.price.toFixed(2));
        }

        momentListings.cheapestListing = cheapestListing;
        return momentListings;
    }
}