const fcl = require('@onflow/fcl')
const types = require('@onflow/types')

/**
 * Use this class to get all data you might need from the database or blockchain
 * like transaction history, moments owned by a user, etc.
 
 * If you want to filter the data, do them through this class instead of further upstream
 * so it can optimize the database lookups.
 * 
 */


fcl.config().put("accessNode.api", "https://flow-access-mainnet.portto.io") 

module.exports = class DataQueries{

    /**
     * 
     * @param {string} address the hex number representing account blockchain address
     */
    static async getAllMomentsOwnedByBlockchainUserID(address){
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
            play_id: data[module_id].setID,
            serial_number: data[module_id].serialNumber,
        }))
    }

    /*
    static async getListingEventsForHeightRange(start, end){
        const response = await fcl.send(
            await sdk.build([sdk.getEvents(eventType, start, toBlock)])
        );
    
        // Return a list of events
        return response.events;
    }*/
    
    /**
     * 
     * @param {*} topshotUsername 
     * @param {If nothing is passed or negative number is passed, assume current time} timestamp 
     */
    static getAllMomentsOwnedByTopshotUsername(topshotUsername, timestamp = -1){
        const blockchainUserID = this.convertTopshotUsernameToBlockchainUserID(topshotUsername);
        return this.getAllMomentsOwnedByBlockchainUserID(blockchainUserID, timestamp);
    }

    static convertTopshotUsernameToBlockchainUserID(topshotUsername){
        //TODO
        return topshotUsername + "_CONVERTED";
    }
    
    static getAllTransactionsOfMoment(momentID){
        //TODO
    }

}