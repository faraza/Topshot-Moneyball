/**
 * Class the server class and CLI calls to get useful topshot data like transactions and sales.
 * Don't call its components directly from one of those classes.
 * 
 * TODO: Make all methods take User as an additional parameter so we can log more intelligently
 */

class TopshotQueries {
    constructor() { 
        //TODO: instantiate transactionAnalyzer, salesAnalyzer, and momentAnalyzer
    }
    
    /**
    * 
    * @param {*} topshotUsername 
    * 
    * returns a list containing tuples of [timestamp, value]
    */
    function getPortfolioValueOverTime(topshotUsername) {
        //TODO        
    }

    function getValueOfMomentAtTime(momentID, timestampToEvaluate){
        //TODO
    }

    /**
     * 
     * @param {unique ID for the moment (AKA card)} momentID
     * Returns a list of transactions sorted from oldest to newest
     * TODO: Right now, we're returning all transactions, but later we'll implement a smart algorithm to reduce it
     */
    function getMomentTransactionHistory(momentID){
        //TODO
    }

    function getPlayerTransactionHistory(playerID){
        //TODO
    }

    /**
     * Returns a list of MarketVolume objects (sorted by oldest date to newest).
     * MarketVolume objects describe number of transactions and total price within that interval
     */
    function getTotalMarketVolumeHistory(){
        //TODO
    }

    /**
     * Returns a list of lowOutlierSales objects.
     * These objects list a moment, the outlier sales listing price, and the other sales listing prices
     */
    function getLowOutlierSalesListings(){
        //TODO
    }

    /**
     * Returns a list of [timestamp, cheapestSalesListingPrice] tuples for a given moment
     * @param {*} momentID 
     */
    function getHistoryOfCheapestSalesListing(momentID){
        //TODO
    }
}