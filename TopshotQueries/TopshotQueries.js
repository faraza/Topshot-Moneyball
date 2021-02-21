/**
 * Class the server and CLI call to get useful topshot data like transactions and sales.
 * Don't call any of its components directly from one of those classes. Add a new query method to this instead.
 * 
 * TODO: Make all methods take User as an additional parameter so we can log more intelligently
 */

const MomentAnalyzer = require('./Components/MomentAnalyzer/MomentAnalyzer'); 
const SalesListingAnalyzer = require('./Components/SalesListingAnalyzer/SalesListingAnalyzer');
const TopshotUserAnalyzer = require('./Components/TopshotUserAnalyzer/TopshotUserAnalyzer')

//TODO: Make all the functions async and do error handling
class TopshotQueries {    
    
    /**
    * 
    * @param {*} topshotUsername 
    * 
    * returns a list containing tuples of [timestamp, value]
    */
    getPortfolioValueHistory(topshotUsername) {        
        const topshotUserAnalyzer = new TopshotUserAnalyzer(topshotUsername);
        return topshotUserAnalyzer.getPortfolioValueHistory();                
    }

    /**
     * 
     * @param {unique ID for the moment (AKA card)} momentID
     * Returns a list of transactions sorted from oldest to newest
     * TODO: Right now, we're returning all transactions, but later we'll implement a smart algorithm to reduce it
     */
    getMomentTransactionHistory(momentID){
        const momentAnalyzer = new MomentAnalyzer(momentID);
        return momentAnalyzer.getTransactionHistory();        
    }

    /**
     * Kind of like getMomentTransactionHistory, but it returns the
     * expected value of that serial number (highest serial if non-provided) as determined by ML model rather than
     * all of the individual sales numbers.
     * @param {*} momentID 
     * @param {if serialNumber is -1, it will assume highest serial number} serialNumber 
     */
    getMomentValueHistoryOfSerialNumber(momentID, serialNumber = -1){
        const momentAnalyzer = new MomentAnalyzer(momentID);
        return momentAnalyzer.getValueHistoryOfSerialNumber(serialNumber);        
    }

    /**
     * Returns a list of lowOutlierSales objects.
     * These objects list a moment, the outlier sales listing price, and the other sales listing prices
     * TODO: Add filters like maximum price we want to consider
     * and players to consider (like only care about stars)
     */
    getLowOutlierSalesListingsOfAllMoments(){        
        const salesListingAnalyzer = new SalesListingAnalyzer();
        salesListingAnalyzer.getLowOutliersForAllMoments()
    }

    /**
     * Returns a list of [timestamp, cheapestSalesListingPrice] tuples for a given moment
     * @param {*} momentID 
     */
    getHistoryOfCheapestSalesListing(momentID){             
        const salesListingAnalyzer = new SalesListingAnalyzer();        
        salesListingAnalyzer.getHistoryOfCheapestListingForMoment(momentID);
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
}


let test = new TopshotQueries();
test.getMomentTransactionHistory("MOMENTID");
test.getMomentValueHistoryOfSerialNumber("MOMENTID");
test.getMomentValueHistoryOfSerialNumber("MOMENTID", "MYSERIAL");

test.getPortfolioValueHistory("TOPSHOTUSERNAME");

test.getLowOutlierSalesListingsOfAllMoments();
test.getHistoryOfCheapestSalesListing("MOMENTID");