var Campaign = require("./CampaignModel");

function CampaignListModel(data) {
    this.data = [];

    for(var x=0;x<data.length;x++){
        this.data.push(new Campaign(data[x]));
    }
}

CampaignListModel.prototype.getType = function(type) {
    return this.data[type];
};

//Inventory
module.exports = CampaignListModel;