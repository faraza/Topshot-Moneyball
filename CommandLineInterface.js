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

    console.log(test.getPortfolioValueHistory("TOPSHOTUSERNAME"));

    console.log(test.getMomentTransactionHistory("MOMENTID"));
    console.log(test.getMomentValueHistoryOfSerialNumber("MOMENTID"));
    console.log(test.getMomentValueHistoryOfSerialNumber("MOMENTID", "MYSERIAL"));

    console.log(test.getLowOutlierSalesListingsOfAllMoments());
    console.log(test.getHistoryOfCheapestSalesListing("MOMENTID"));
}

basicTests();



