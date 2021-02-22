//example endpoint: //https://cryptoslam.io/nba-top-shot/run/?Name=Jaylen%20Brown
function scrapeWebsite(){
    const endpointStart = 'https://cryptoslam.io/nba-top-shot/run/?Name=';
    let playerNames; //TODO: get it from the file Bryan got

    for(player in playerNames){
        player = player.trim();
        player.replace(' ', '%20');
        const endpoint = endpointStart + player;

        //TODO: Scrape it
    }

}