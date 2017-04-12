var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var json2csv = require('json2csv');
var fs = require('fs'); //fs module native to node
//var ws = fs.createWriteStream('zillowData.csv'); // file name and location to save it at
var app = express();
var port = 8080;
var houseObj = [];
var submitjs = require('./submit');

//var submitjs = require('../../routes/submit');

var mystring = "zillowscrape";

//console.log(submitjs.testprm)
/*{
    streetAddress : "",
    city : "",
    state: "",
    zipcode: "",
    popertyStatus : "",
    popertyPrice : "",
    popertyInfo : "",
    daysInMarket: "",
    popertyAddress: "",
    popertyStatus : "",
    streetAddress : "",
    propertyLink : ""     
}*/

//var url = "http://www.zillow.com/homes/for_sale/Charlotte-NC/24043_rid/globalrelevanceex_sort/35.342855,-80.503349,35.077494,-81.161156_rect/9_zm/";
function getZillow(){
    
    var url = "https://www.zillow.com/homes/for_sale/Charlotte-NC_rb/?fromHomePage=true&shouldFireSellPageImplicitClaimGA=false&fromHomePageTab=buy";


    request(url, function(err, resp, body){
        var $ = cheerio.load(body);
        // 
        if(err){
            console.log(err);
        }else{
//            console.log("in zillow function")
            console.log(submitjs)

            $('.photo-cards').find('.zsg-photo-card-content').each(function(i, element){
                var zillowData = {};
                var streetAddress = $('span[itemprop="streetAddress"]').get(i);
                var streetAddresstext = $(streetAddress).text();

                var city = $('span[itemprop="addressLocality"]').get(i);
                var citytext = $(city).text();

                var state = $('span[itemprop="addressRegion"]').get(i);
                var statetext = $(state).text();

                var zipcode = $('span[itemprop="postalCode"]').get(i);
                var zipcodetext = $(zipcode).text();

                var propertyStatus = $('.zsg-photo-card-status').get(i);
                var propertyStatustext = $(propertyStatus).text();

                var propertyPrice = $('.zsg-photo-card-price').get(i);
                var propertyPricetext = $(propertyPrice).text();

                var propertyInfo = $('.zsg-photo-card-info').get(i);
                var propertyInfotext = $(propertyInfo).text();

                var daysInMarket = $('.zsg-photo-card-notification').get(i);
                var daysInMarkettext = $(daysInMarket).text();

                var propertyAddress = $('.zsg-photo-card-address').get(i);
                var propertyAddresstext = $(propertyAddress).text();

                var propertyLink = $('.zsg-photo-card-overlay-link').get(i);
                var propertyLinktext = "http://www.zillow.com" + $(propertyLink).attr('href');

                zillowData ['streetAddress'] = streetAddresstext;
                zillowData ['city'] = citytext;
                zillowData ['state'] = statetext;
                zillowData ['zipcode'] = zipcodetext;
                zillowData ['propertyStatus'] = propertyStatustext;
                zillowData ['propertyPrice'] = propertyPricetext;
                zillowData ['propertyInfo'] = propertyInfotext;
                zillowData ['daysInMarket'] = daysInMarkettext;
                zillowData ['propertyAddress'] = propertyAddresstext;
                zillowData ['propertyLink'] = propertyLinktext;

    /*            console.log(streetAddresstext);
                console.log(citytext);
                console.log(statetext);
                console.log(zipcodetext);
                console.log(popertyStatustext);
                console.log(popertyPricetext);
                console.log(popertyInfotext);
                console.log(daysInMarkettext);
                console.log(popertyAddresstext);
                console.log(propertyLinktext);*/

                houseObj.push(zillowData);
            });
            console.log("Processed Data ..\n");
          // console.log(houseObj);

            var fields = ['streetAddress','city','state','zipcode','propertyStatus','propertyPrice','propertyInfo','daysInMarket','propertyAddress','propertyLink'];    
            var fieldNames = ["Street","City", "State", "Zipcode","Property Status","Price", "Property Specs", "Days on the market","Full Address","URL"];
            var csv = json2csv({data: houseObj, fields: fields, fieldNames: fieldNames});
            fs.writeFile('zillowData.csv', csv, function(err){
                if(err) throw err;
                console.log('Filed saved');
            });
            
            return houseObj;
        }
    });

    app.listen(port);
    console.log("server running on port "+ port);
}

module.exports.getZillow = getZillow;
module.exports.houseObj = houseObj;
