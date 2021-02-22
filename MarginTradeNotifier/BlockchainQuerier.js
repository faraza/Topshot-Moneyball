const fcl = require('@onflow/fcl')
const types = require('@onflow/types')
const sdk = require('@onflow/sdk')
const { Pool, Client } = require("pg");

module.exports = class BlockchainQuerier{

    constructor(){
        fcl.config().put("accessNode.api", "https://flow-access-mainnet.portto.io")
    }

    prevTransactionHeight = null
    
    async getMostRecentTransactions(timeInMS){
        let height = await this.getCurrentBlockHeight();
        this.prevTransactionHeight = this.prevTransactionHeight || height - 10; 
        // console.log(this.prevTransactionHeight, '-', height)
        try {
            const range = await this.getPurchaseEventsForHeightRange(this.prevTransactionHeight, height);
            this.prevTransactionHeight = height
            return range;
        } catch (error) {
            return []
        }
        
        
    }

    getFakeRecentTransactions(){
        return [{'block_height': 1, 'moment_id': 537605, 'price': 130, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 577100, 'price': 129, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 430089, 'price': 130, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 1113734, 'price': 130, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 90521, 'price': 615, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 559599, 'price': 999, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 559586, 'price': 900, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 246662, 'price': 150, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 551242, 'price': 130, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 394712, 'price': 128, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 1129831, 'price': 128, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 79062, 'price': 574, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 181382, 'price': 500, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 38197, 'price': 275, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 181319, 'price': 575, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 237237, 'price': 143, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 537601, 'price': 129, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 531664, 'price': 129, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 337462, 'price': 139, 'seller_id': 'test'},
        {'block_height': 1, 'moment_id': 317511, 'price': 139, 'seller_id': 'test'}];
    }

    prevListingsHeight = null
    async getMostRecentSalesListings(timeInMS){        
        let height = await this.getCurrentBlockHeight();
        this.prevListingsHeight = this.prevListingsHeight || height - 10; 
        // console.log(this.prevListingsHeight, '-', height)
        try {
            const range = await this.getListingEventsForHeightRange(this.prevListingsHeight, height);
            this.prevListingsHeight = height
            return range;
        } catch (error) {
            return []
        }
        
    }

    getFakeSalesListings(){
        return [{'block_height': 1, 'moment_id': 537605, 'price': 100, 'seller_id': 'test'}]
    }


    /***
     * 
     * 'Private' functions
     */
    async getCurrentBlockHeight() {
        const response = await fcl.send(
            await sdk.build([
                sdk.getLatestBlock()
            ])
        );
        return response.block.height;
    }

    async getListingEventsForHeightRange(start, end) {

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

    async getPurchaseEventsForHeightRange(start, end) {

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
}

