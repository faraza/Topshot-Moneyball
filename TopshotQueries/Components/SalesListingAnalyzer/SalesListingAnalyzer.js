module.exports = class SalesListingAnalyzer{
    
    
    /**
     * Checks all sales listings within each moment to see if there is one that is SIGNIFICANTLY
     * lower than all of the other ones in price. 
     * 
     * We define significant as 50% or lower.
     * //TODO: Change the threshold
     */
    getLowOutliersForAllMoments(){
        //TODO
        console.log("SalesListingAnalyzer::getLowOutliersForAllMoments");
    }

    getHistoryOfCheapestListingForMoment(momentID){
        console.log("SalesListingAnalyzer::getHistoryOfCheapestListingForMoment: " + momentID);
    }
}