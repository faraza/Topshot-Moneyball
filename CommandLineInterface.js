/**
 * 
 * This class is a lightweight way of testing TopshotQueries before 
 * wiring up to the full-stack with React
 * 
 * TODO: Make it actually take Command Line Args
 * 
 */


const TopshotQueries = require('./TopshotQueries/TopshotQueries')

function basicTests(){
    let test = new TopshotQueries();
    
    test.getPortfolioValueHistory("TOPSHOTUSERNAME");

    test.getMomentTransactionHistory("MOMENTID");
    test.getMomentValueHistoryOfSerialNumber("MOMENTID");
    test.getMomentValueHistoryOfSerialNumber("MOMENTID", "MYSERIAL");

    test.getLowOutlierSalesListingsOfAllMoments();
    test.getHistoryOfCheapestSalesListing("MOMENTID");
}

basicTests();



