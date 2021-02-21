/**
 * Call this class to: 
 * 1) Run math and other analytics on moments  
 * 2) Get back data lists about moments
 */

const DataQueries = require('../DataQueries/DataQueries')
const MomentMath = require('./Math/MomentMath')

module.exports = class MomentAnalyzer{
    momentID = -1;
    
    constructor(momentID){
        this.momentID = momentID;
    }
    
    /**
     * 
     * @param {If < 0, defaults to highest serial} serialNumber 
     */
    getValueHistoryOfSerialNumber(serialNumber = -1){
        const startingTimestamp = 0; //TODO: October 2020, when the platform was launched?
        const currentTimestamp = 1000; //TODO
        const interval = 100;

        let momentValueHistory = []

        for(let timestamp = startingTimestamp; timestamp <= currentTimestamp; timestamp += interval){
            const momentValueTuple = [timestamp, this.getValueOfSerialNumberAtTime(serialNumber, timestamp)];
            momentValueHistory.push(momentValueTuple);
        }

        return momentValueHistory;
    }

    getValueOfSerialNumberAtTime(serialNumber, time){
        return MomentMath.getValueOfMomentWithSerialAtTime(this.momentID, serialNumber, time);
    }

    getTransactionHistory(){
        return DataQueries.getAllTransactionsOfMoment(this.momentID);        
    }
}