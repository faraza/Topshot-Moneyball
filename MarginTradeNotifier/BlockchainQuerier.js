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

    getFakePurchaseEvents(){
        //TODO    
    }

    getFakeSalesListings(){
        //TODO
        fakeSalesListings = [
            {
              block_height: 12165378,
              moment_id: 1992125,
              price: 30,
              seller_id: '0xef395fdc7b8a8132'
            },
            {

            }
          ];
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

