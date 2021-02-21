#!/usr/bin/env node
/**
 * 
 * This class is a lightweight way of testing TopshotQueries before 
 * wiring up to the full-stack with React
 * 
 * TODO: Make it actually take Command Line Args
 * 
 */

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv))
            .option('account', {
                alias: 'a',
                type: 'string',
            })
            .argv

//const TopshotQueries = require('./TopshotQueries/TopshotQueries')
const DataQueries = require('./TopshotQueries/Components/DataQueries/DataQueries.js')

/*
 * example: ./CommandLineInterface.js --account=0xdc37f43c2d98de15
 */
if (argv.account) {
    (async function() {
        let moments = await DataQueries.getAllMomentsOwnedByBlockchainUserID(argv.account);
        console.log(moments);
    })()
}

if (argv.listings ) {
    (async function() {
        let height = await DataQueries.getCurrentBlockHeight();
        let moments = await DataQueries.getListingEventsForHeightRange(height - 1500, height);
        console.log(moments);
    })()
}
    
/*
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
*/


