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

const TopshotQueries = require('./TopshotQueries/TopshotQueries')
const DataQueries = require('./TopshotQueries/Components/DataQueries/DataQueries.js')

/*
 * example: ./CommandLineInterface.js --account=0xdc37f43c2d98de15
 */
if (argv.account) {
    (async function() {
        let moments = await DataQueries.getAllMomentsListedByBlockchainUserID(argv.account);
        console.log(moments);
    })()
}

if (argv.listings) {
    (async function() {
        let height = await DataQueries.getCurrentBlockHeight();
        let moments = await DataQueries.getListingEventsForHeightRange(height - 1500, height);
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


function getDeandreJordanDunkMomentTokenIDs(){
    const data = require('./data/DeandreJordan_uncleanData.json')
    // console.log(data);

    const newData = data.filter((item)=>{
        return item.tokens.find((token)=>{
            return token.attributes.MomentDate === '2020-01-03 01:30:00 +0000 UTC';
        }) != null;
    })

    // console.log(newData)
    // console.log(newData.length);
    const tokenIDs = newData.map((item)=>{
        return item.tokens[0].tokenId;
    })

    // console.log(tokenIDs);
    console.log(tokenIDs.length);
}



/**
 * Sample Sales listing:
 * 
 *  
 {
    block_height: 12140393,
    moment_id: 629006,
    price: 485,
    seller_id: '0x9d14e5a4c25bf756'
 }
 * 
 */


async function printListings(){
    let height = await DataQueries.getCurrentBlockHeight();
    let salesListings = await DataQueries.getListingEventsForHeightRange(height - 1500, height);
    console.log(salesListings);
}

// printListings();
// convertJSON();



let test = new TopshotQueries();
console.log(test.getLowOutlierSalesListingsOfAllMoments());