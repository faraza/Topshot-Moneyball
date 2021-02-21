/**
 * Call this class to get data about a topshot user.
 * 
 * Currently, it's just wallet-related data but later we may
 * add info about buying and selling trends
 * 
 */

module.exports = class TopshotUserAnalyzer{
    username = -1;

    constructor(username){
        this.username = username;
    }

    static convertUsernameToBlockchainUserID(username){
        //TODO
        return username + "_TOBLOCKCHAINID"
    }

    getPortfolioValueHistory(){
        //TODO
        console.log("user analyzer: " + this.username + " converted: " + 
        TopshotUserAnalyzer.convertUsernameToBlockchainUserID(this.username) + " get portfolio value history")
    }
}