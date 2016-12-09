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

}

CampaignModel.prototype.addData = function(data) {
    this.data.push(data);
    this.mostRecentRecord = data;
    //this.mostRecentRecord.ctr = data.clicks/data.users;

    this.totalImpressions += data.impressions;
    this.totalClicks += data.clicks;
    this.totalUsers = data.users;
    this.totalCTR += data.ctr;
    this.iteration ++;
};

CampaignModel.prototype.getSma = function() {
    var offset = 10;

    var len = this.data.length < 10 ? this.data.length: this.data.length - offset;

    var totalImp =0;
    for(var x=len; x< this.data.length; x++) {
        var item = this.data[x];
        totalImp += item.impressions;
    }

    var sma = totalImp / offset;

    return sma;
};

module.exports = CampaignModel;