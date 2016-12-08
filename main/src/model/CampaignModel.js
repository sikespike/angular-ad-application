function CampaignModel(data){
    this.id = data.id;
    this.name = data.name;
    this.totalImpressions = 0;
    this.totalClicks = 0;
    this.totalCTR = 0;
    this.totalUsers = 0;
    this.iteration = 0;
    this.mostRecentRecord = null;
    this.data = [];
}

function updateTotals(data) {
    this.totalImpressions += data.impressions;
    this.totalClicks += data.clicks;
    //this.totalCTR += data.ctr;
    this.totalUsers = data.users;
    this.iteration++;
}

CampaignModel.prototype.addData = function(data) {
    this.data.push(data);
    this.mostRecentRecord = data;
    updateTotals.call(data, this);
};

module.exports = CampaignModel;