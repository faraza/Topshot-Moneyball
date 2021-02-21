/**
 * Call this class to analyze moments and get back
 * data lists
 */

module.exports = class MomentAnalyzer{
    momentID = -1;
    
    constructor(momentID){
        this.momentID = momentID;
    }
    
    getValueHistoryOfSerialNumber(serialNumber){
        //TODO
    }

    getValueOfSerialNumberAtTime(serialNumber, time){
        //TODO
    }

    getTransactionHistory(){
        //TODO
        console.log("Get transaction history for moment: " + this.momentID);
    }
}