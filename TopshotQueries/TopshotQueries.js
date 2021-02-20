/**
 * Class the server class and CLI calls to get useful topshot data like transactions and sales.
 * Don't call its components directly from one of those classes.
 * 
 * TODO: Make all methods take User as an additional parameter so we can log more intelligently
 */

class TopshotQueries {
    constructor() { 
        //TODO: instantiate transactionFetcher and transactionAnalyzer
    }
    
    /**
    * 
    * @param {*} topshotUsername 
    * 
    * returns a list containing tuples of [timestamp, value]
    */
    function getPortfolioValueOverTime(topshotUsername) {
        //TODO
            //1: Get all moments from the username
            //2: For each day from 30 days ago to today
                //Query momentAnalyzer to get value
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
}