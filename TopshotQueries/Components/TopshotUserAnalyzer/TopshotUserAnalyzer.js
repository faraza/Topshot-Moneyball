/**
 * Call this class to get data about a topshot user.
 * 
 * Currently, it's just wallet-related data but later we may
 * add info about buying and selling trends
 * 
 */

 const DataQueries = require('../DataQueries/DataQueries')

module.exports = class TopshotUserAnalyzer{
    username = -1;

    constructor(username){
        this.username = username;
    }

    //TODO: If getting moment value at an arbitrary time is too hard, we can modify this to just current moment value
    getCurrentPortfolioValue(){
        const currentTime = 1000; //TODO        
        return this.getPortfolioValueAtTime(currentTime);        
    }

    getPortfolioValueHistory(){        
        const startingTimestamp = 0; //TODO: October 2020, when the platform was launched?
        const currentTimestamp = 1000; //TODO
        const interval = 100;

        let portfolioValueHistory = []

        for(let timestamp = startingTimestamp; timestamp <= currentTimestamp; timestamp += interval){
            let portfolioValueTuple = [timestamp, this.getPortfolioValueAtTime(timestamp)];
            portfolioValueHistory.push(portfolioValueTuple);
        }

        return portfolioValueHistory;        
    }

    getPortfolioValueAtTime(timestamp){
        const momentsInWallet = DataQueries.getAllMomentsOwnedByTopshotUsername(this.username, timestamp);

        let valueOfPortfolio = 0;
        for(let moment in momentsInWallet){
            //TODO
            //let momentAnalyzer = new MomentAnalyzer(moment);
            //valueOfPortfolio += momentAnalyzer.getValueAtTime(timestamp);
        }

        return valueOfPortfolio;

    }

    getWalletContentsAtTime(timestamp){
        return DataQueries.getAllMomentsOwnedByTopshotUsername(username, timestamp);
    }


}