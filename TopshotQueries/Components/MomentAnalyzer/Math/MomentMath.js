const DataQueries = require('../../DataQueries/DataQueries')

/**
 * 
 * TODO: Bryan, you gotta figure this out. Use ML I guess, idk
 * 
 */

module.exports = class MomentMath{

    static getValueOfMomentWithSerialAtTime(momentID, serialNum, timestamp){
        let momentTransactionHistory = DataQueries.getAllTransactionsOfMoment(momentID);
        //TODO
    }


}