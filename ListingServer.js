

const { Pool, Client } = require("pg")
const DataQueries = require('./TopshotQueries/Components/DataQueries/DataQueries')

const client = new Client({
    user: "postgres",
    host: "35.235.64.237",
    database: "topshot",
    password: "root",
});
client.connect();


const insert = async (query) => {
    return new Promise(resolve => {
        client.query(query, (err, res) => {
            // console.log(err,res)
            resolve();
        });
    })
}
const run = async () => {
    while (true) {
        const listings = await DataQueries.getRecentSalesListingsGroupedByMoment();
        const data = listings.map(
            (listing) =>
                `(${listing.block_height},${listing.moment_id},${listing.price},'${listing.seller_id}')`
        ); 
        
        const query = `INSERT INTO listings (block_height,moment_id,price,seller_id) VALUES ${data.join(
            ","
        )}`;
        console.log('query', listings.map(l => l.moment_id))
        await insert(query)
    }
}

run()