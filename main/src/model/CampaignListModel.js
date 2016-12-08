var _ = require("underscore");
var Campaign = require("./CampaignModel");

function CampaignListModel(data) {
    this.data = {};

    data.forEach(_.bind(function(item){
        this.data[item.id] = new Campaign(item);
    },this));
}

CampaignListModel.prototype.getAsList = function() {
    var arr = [];

    var keys = _.keys(this.data);

    for(var x=0;x<keys.length;x++) {
        var item = this.data[keys[x]];

        arr.push(item);
    }

    return arr;
};

CampaignListModel.prototype.getType = function(type) {
    return this.data[type];
};

//Inventory
module.exports = CampaignListModel;