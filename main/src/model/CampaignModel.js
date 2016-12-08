/**
 1. Total Impressions
 2. Total Clicks
 3. Total CTR
 4. Total Users
 5. A Simple Moving Average of last 10 data pulls impressions (details at end of this
 document, if you don’t know what one is)
 6. Current Number (iteration/pull #)
 7. Most Recent Impressions
 8. Most Recent Clicks
 9. Most Recent CTR
 10. Most Recent Users
 */
function CampaignModel(){
    this.totalImpressions = 0;
    this.totalClicks = 0;
    this.totalCTR = 0;
    this.currentIteration = 0;
    this.mostRecentRecord = null;
    this.data = [];
}

CampaignModel.prototype.addData = function(data) {
    this.data.push(data);
};

module.exports = CampaignModel;