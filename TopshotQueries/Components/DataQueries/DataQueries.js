const fcl = require('@onflow/fcl')
const types = require('@onflow/types')
const sdk = require('@onflow/sdk')
const { Pool, Client } = require("pg");


/**
 * Use this class to get all data you might need from the database or blockchain
 * like transaction history, moments owned by a user, etc.
 
 * If you want to filter the data, do them through this class instead of further upstream
 * so it can optimize the database lookups.
 * 
 * 
 * TODO: Thomas, you gotta figure this out.
 */


fcl.config().put("accessNode.api", "https://flow-access-mainnet.portto.io")

const client = new Client({
    user: "postgres",
    host: "35.235.64.237",
    database: "topshot",
    password: "root",
});
client.connect();



module.exports = class DataQueries {

    /**
     * Example getAllMomentsOwnedByBlockchainUserID("0xdc37f43c2d98de15")
     * @param {string} address the hex number representing account blockchain address
     */
    static async getAllMomentsOwnedByBlockchainUserID(address) {
        const data = await fcl.send([
            fcl.script`
            import TopShot from 0x0b2a3299cc857e29
            import Market from 0xc1e4f4f4c4257510

            pub fun main(address: Address): {UInt64: TopShot.MomentData} {
                let account = getAccount(address)
                let topshotSaleCollection = account.getCapability(/public/MomentCollection).borrow<&{TopShot.MomentCollectionPublic}>()!
                let data: {UInt64: TopShot.MomentData} = {}
                for id in topshotSaleCollection.getIDs()! {
                    let nft = topshotSaleCollection.borrowMoment(id: id)!
                    data.insert(key: id, nft.data) 
                }
                return data
            }
            `,
            fcl.args([
                fcl.arg(address, types.Address),
            ]),
        ])
            .then(fcl.decode)

        return Object.keys(data).map((module_id) => ({
            module_id: module_id,
            set_id: data[module_id].setID,
            play_id: data[module_id].playID,
            serial_number: data[module_id].serialNumber,
        }))
    }

    /**
 * Example getAllMomentsOwnedByBlockchainUserID("0xdc37f43c2d98de15")
 * @param {string} address the hex number representing account blockchain address
 */
    static async getAllMomentsListedByBlockchainUserID(address) {
        const data = await fcl.send([
            fcl.script`
            import TopShot from 0x0b2a3299cc857e29
            import Market from 0xc1e4f4f4c4257510

            pub fun main(address: Address): {UInt64: TopShot.MomentData} {
                let account = getAccount(address)
                let topshotSaleCollection = account.getCapability(/public/topshotSaleCollection).borrow<&{Market.SalePublic}>()!
                let data: {UInt64: TopShot.MomentData} = {}
                for id in topshotSaleCollection.getIDs()! {
                    let nft = topshotSaleCollection.borrowMoment(id: id)!
                    data.insert(key: id, nft.data) 
                }
                return data
            }
            `,
            fcl.args([
                fcl.arg(address, types.Address),
            ]),
        ])
            .then(fcl.decode)

        return Object.keys(data).map((module_id) => ({
            module_id: module_id,
            set_id: data[module_id].setID,
            play_id: data[module_id].playID,
            serial_number: data[module_id].serialNumber,
        }))
    }

    static async getCurrentBlockHeight() {
        const response = await fcl.send(
            await sdk.build([
                sdk.getLatestBlock()
            ])
        );
        return response.block.height;
    }

    static async getListingEventsForHeightRange(start, end) {

        const response = await fcl.send(
            await sdk.build([
                sdk.getEvents("A.c1e4f4f4c4257510.Market.MomentListed", start, end)
            ])
        );

        return response.events.map(x => ({
            block_height: x.blockHeight,
            moment_id: parseInt(x.payload.value.fields[0].value.value),
            price: parseFloat(x.payload.value.fields[1].value.value),
            seller_id: x.payload.value.fields[2].value.value.value
        }));

    }

    static async getPurchaseEventsForHeightRange(start, end) {

        const response = await fcl.send(
            await sdk.build([
                sdk.getEvents("A.c1e4f4f4c4257510.Market.MomentPurchased", start, end)
            ])
        );

        return response.events.map(x => ({
            block_height: x.blockHeight,
            moment_id: parseInt(x.payload.value.fields[0].value.value),
            price: parseFloat(x.payload.value.fields[1].value.value),
            seller_id: x.payload.value.fields[2].value.value.value
        }));

    }
    /**
     * 
     * @param {*} topshotUsername 
     * @param {If nothing is passed or negative number is passed, assume current time} timestamp 
     */
    static getAllMomentsOwnedByTopshotUsername(topshotUsername, timestamp = -1) {
        const blockchainUserID = this.convertTopshotUsernameToBlockchainUserID(topshotUsername);
        return this.getAllMomentsOwnedByBlockchainUserID(blockchainUserID, timestamp);
    }

    static convertTopshotUsernameToBlockchainUserID(topshotUsername) {
        //TODO: Do some HTTP GET stuff to figure this out
        return topshotUsername + "_CONVERTED";
    }

    static getAllTransactionsOfMoment(momentID) {
        //TODO
    }


    static getAllActiveSalesListingsGroupedByMoment() {

    }

    static getDeandreJordanDunkMomentTokenIDs() {
        const data = require('../../../data/DeandreJordan_uncleanData.json')
        // console.log(data);

        const newData = data.filter((item) => {
            return item.tokens.find((token) => {
                return token.attributes.MomentDate === '2020-01-03 01:30:00 +0000 UTC';
            }) != null;
        })

        // console.log(newData)
        // console.log(newData.length);
        const tokenIDs = newData.map((item) => {
            return item.tokens[0].tokenId;
        })

        return tokenIDs;
        // console.log(tokenIDs);
        // console.log(tokenIDs.length);
    }

    prevBlockHeight;

    static async getRecentSalesListingsGroupedByMoment() {
        let height = await this.getCurrentBlockHeight();
        let recentSalesListings = []
        if (this.prevBlockHeight == null) {
            recentSalesListings = await this.getListingEventsForHeightRange(height - 10, height)
        } else {
            try {
                recentSalesListings = await this.getListingEventsForHeightRange(this.prevBlockHeight, height)
            } catch {
                return [];
            }
        }
        this.prevBlockHeight = height;
        return recentSalesListings
    }

    static async getRecentListings() {
        return new Promise(resolve => {
            const query = `SELECT * FROM listings WHERE time_stamp > current_timestamp - INTERVAL '30 minutes'`;
            client.query(query, (err, res) => {
                resolve(res.rows)
            });
        })

    }

    static async groupListingsByMoment(listings) {

        const tokenIds = listings.map(l => l.moment_id);
        console.log('tokenIds', tokenIds)
        if (tokenIds.length === 0) return;
        const rows = await DataQueries.getCardIDFromTokenIDs(tokenIds);
        console.log('rows', rows)
        const matches = {}
        rows.forEach(r => {
            const key = `${r.name}-${r.momentdate}-${r.season}-${r.playcategory}-${r.set}`;
            matches[r.tokenid] = key;
        })
        console.log('matches', matches)

        const listingsGroupedByMoments = {}

        listings.forEach(listing => {
            const key = matches[listing.moment_id.toString()]
            if (key != null) {
                if (listingsGroupedByMoments[key] != null) {
                    listingsGroupedByMoments[key].push(listing)
                } else {
                    listingsGroupedByMoments[key] = [listing]
                }
            }
        })
        console.log(listingsGroupedByMoments)
        return listingsGroupedByMoments;
    }

    static getCardIDFromTokenIDs(tokenIds) {
        return new Promise((resolve) => {
            const ids = tokenIds.map(id => `'${id}'`)
            const query = `SELECT * from moment_map WHERE tokenid IN(${ids.join(",")})`;
            client.query(query, (err, res) => {
                resolve(res.rows)
            });
        })
    }
}