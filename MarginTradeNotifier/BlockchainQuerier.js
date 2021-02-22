module.exports = class BlockchainQuerier{
    async getMostRecentTransactions(timeInMS){
        let height = await this.getCurrentBlockHeight();
        let blocksToQuery = 150; //TODO: Convert timeInMS to blocksToQuery
   
        return await getPurchaseEventsForHeightRange(height - timeToQuery, height);
    }

    async getMostRecentSalesListings(timeInMS){        
        let height = await this.getCurrentBlockHeight();
        let blocksToQuery = 150; //TODO: Convert timeInMS to blocksToQuery
        
        return await getListingEventsForHeightRange(height - timeToQuery, height);
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
}
