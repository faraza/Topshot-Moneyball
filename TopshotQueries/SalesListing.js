module.exports = class MomentSalesListings{
    listings = [] //array of singlesaleslistings

    cheapestListing;
    percentFromCheapestToSecondCheapest;
}

module.exports = class SingleSalesListing{
    price;
    sellerID;
    timestampOfListing;
    momentID;
    serialNum;
    tokenID;    
}