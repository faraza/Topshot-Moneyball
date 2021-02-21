/**
 * Call this class to: 
 * 1) Run math and other analytics on moments  
 * 2) Get back data lists about moments
 */

module.exports = class MomentAnalyzer{
    momentID = -1;
    
    constructor(momentID){
        this.momentID = momentID;
    }
    
    getValueHistoryOfSerialNumber(serialNumber){
        //TODO
        console.log("getValueHistoryOfSerialNumber for moment: " + this.momentID + " with serial: " + serialNumber);

    }

    getValueOfSerialNumberAtTime(serialNumber, time){
        //TODO
    }

    getTransactionHistory(){
        //TODO
        console.log("Get transaction history for moment: " + this.momentID);
    }
}