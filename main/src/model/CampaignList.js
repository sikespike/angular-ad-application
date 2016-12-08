_ = require("underscore");

function CampaignList(data) {
    this.data = buildCampaignList(data);
}


function buildCampaignList(data) {
    return data;
}

CampaignList.prototype.getAsList = function() {
    var arr = [];

    var keys = _.keys(this.data);

    for(var x=0;x<keys.length;x++) {
        var item = this.data[keys[x]];

        arr.push(item);
    }

    return arr;
};

CampaignList.prototype.getTotal = function() {
    var total =0;

    var keys = _.keys(this.data);

    for(var x=0;x<keys.length;x++) {
        var item = this.data[keys[x]];

        total += item.quantity;
    }

    return total;
};

CampaignList.prototype.calculateTotals = function() {
    var keys = _.keys(this.data);

    for(var x=0;x<keys.length;x++) {
        var item = this.data[keys[x]];

        this.data[keys[x]].cost = item.quantity * item.price;
    }
};

CampaignList.prototype.getNetTotal = function() {
    var keys = _.keys(this.data);

    var total =0;
    for(var x=0;x<keys.length;x++) {
        var item = this.data[keys[x]];

        total += item.quantity * item.price;
    }

    return total;
};

CampaignList.prototype.addTo = function(type) {
    this.data[type].quantity += 1;
};

CampaignList.prototype.subFrom = function(type) {
    if(this.data[type].quantity && this.data[type].quantity > 0) {
        this.data[type].quantity -= 1;
    }
};

CampaignList.prototype.setType = function(type, quantity) {
    this.data[type].quantity = quantity;
};

CampaignList.prototype.getType = function(type) {
    return this.data[type];
};

CampaignList.prototype.resetType = function(type) {
    if(this.data[type].quantity && this.data[type].quantity > 0) {
        this.data[type].quantity = 0;
    }
};

CampaignList.prototype.reset = function() {
    var keys = _.keys(this.data);

    for(var x=0;x<keys.length;x++) {
        this.data[keys[x]].quantity = 0;
        this.data[keys[x]].cost = 0;
    }
};

//Inventory
module.exports = CampaignList;