/**
 * Use this class to get all data you might need from the database or blockchain
 * like transaction history, moments owned by a user, etc.
 
 * If you want to filter the data, do them through this class instead of further upstream
 * so it can optimize the database lookups.
 * 
 * 
 * TODO: Thomas, you gotta figure this out.
 */

module.exports = class DataQueries{

    /**
     * 
     * @param {*} blockchainUserID 
     * @param {If nothing is passed or negative number is passed, assumes curren time} timestamp 
     */
    static getAllMomentsOwnedByBlockchainUserID(blockchainUserID, timestamp = -1){
        //TODO
    }

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
        //TODO: Do some HTTP GET stuff to figure this out
        return topshotUsername + "_CONVERTED";
    }
    
    static getAllTransactionsOfMoment(momentID){
        //TODO
    }

    static getAllActiveSalesListingsGroupedByMoment(){
        //TODO
    }
}