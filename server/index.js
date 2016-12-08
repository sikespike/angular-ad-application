var express = require('express');
var app = express();
var campaignList = require('./campaign-list.js');
var campaignData = require('./campaign-data.js');
var fs = require("fs")

// in NodeJS/Express (server)
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/api/campaigns', campaignList);
app.get('/api/campaigns/:cid', campaignData);

//---examples of loading json file
/*app.get('/api/loadInventory', function (req, res) {
    console.log("loadInventory request");
    console.log("reading inventory.json");
    var data = fs.readFileSync("inventory.json");
    //console.log(data);
    res.send(JSON.parse(data));
});*/

app.use(express.static("dist"));

app.listen(3000, "0.0.0.0", function () {
    console.log('Ad Api Server launched on port 3000~!')
});