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

        //topshotUserAnalyzer(topshotUsername)
            //This class will figure out everything in the wallet at each time
            //Then run momentAnalyzer on each and sum the price up
        //return topshotUserAnalyzer.getPortfolioValueOverTime()
    }

    /**
     * 
     * @param {unique ID for the moment (AKA card)} momentID
     * Returns a list of transactions sorted from oldest to newest
     * TODO: Right now, we're returning all transactions, but later we'll implement a smart algorithm to reduce it
     */
    function getMomentTransactionHistory(momentID){
        //TODO
        //momentAnalyzer(momentID)
        //return momentAnalyzer.getTransactionHistory();
    }

    /**
     * Kind of like getMomentTransactionHistory, but it returns the
     * 'average' price (determined by ML model) rather than
     * all of the individual sales numbers.
     * @param {*} momentID 
     * @param {if serialNumber is -1, it will assume highest serial number} serialNumber 
     */
    function getMomentValueOverTime(momentID, serialNumber = -1){
        //TODO
        //momentAnalyzer(momentID, serialNumber)
            //return momentAnalyzer.getValueHistory();
    }

    function getPlayerTransactionHistory(playerID){
        //TODO
        //playerAnalyzer(playerID)

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