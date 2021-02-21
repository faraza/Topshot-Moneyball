/**
 * Class the server class and CLI calls to get useful topshot data like transactions and sales.
 * Don't call its components directly from one of those classes.
 * 
 * TODO: Make all methods take User as an additional parameter so we can log more intelligently
 */

const MomentAnalyzer = require('./Components/MomentAnalyzer/MomentAnalyzer') 

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
    getPortfolioValueOverTime(topshotUsername) {        
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
    getMomentTransactionHistory(momentID){
        let momentAnalyzer = new MomentAnalyzer(momentID);
        return momentAnalyzer.getTransactionHistory();        
    }

    /**
     * Kind of like getMomentTransactionHistory, but it returns the
     * expected value of that serial number (highest serial if non-provided) as determined by ML model rather than
     * all of the individual sales numbers.
     * @param {*} momentID 
     * @param {if serialNumber is -1, it will assume highest serial number} serialNumber 
     */
    getMomentValueOverTime(momentID, serialNumber = -1){
        //TODO
        //momentAnalyzer(momentID)
            //return momentAnalyzer.getValueHistoryOfSerialNumber(serialNumber);
    }

    getPlayerTransactionHistory(playerID){
        //TODO
        //playerAnalyzer(playerID)
            //return playerAnalyzer.getTransactionHistory();
    }

    /**
     * Returns a list of MarketVolume objects (sorted by oldest date to newest).
     * MarketVolume objects describe number of transactions and total price within that interval
     */
    getTotalMarketVolumeHistory(){
        //TODO
        //marketAnalyzer
        //return marketAnalyzer.getTotalVolumeHistory()
    }

    /**
     * Returns a list of lowOutlierSales objects.
     * These objects list a moment, the outlier sales listing price, and the other sales listing prices
     * TODO: Add filters like maximum price we want to consider
     * and players to consider (like only care about stars)
     */
    getLowOutlierSalesListings(){
        //TODO
        //salesListingAnalyzer() 
        //salesListingAnalyzer.getOutlierSalesListings()
    }

    /**
     * Returns a list of [timestamp, cheapestSalesListingPrice] tuples for a given moment
     * @param {*} momentID 
     */
    getHistoryOfCheapestSalesListing(momentID){
        //TODO
        //momentAnalyzer(momentID)
        //momentAnalyzer.getHistoryOfCheapestSalesListing();
    }
}


let test = new TopshotQueries();
test.getMomentTransactionHistory("123");