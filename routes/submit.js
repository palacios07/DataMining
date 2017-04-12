var express = require('express');
var router = express.Router();
var zTest = require('./csvZillow.js');

//var zTest = require('../public/javascripts/csvZillow.js');

var obj;
var narea;
var nroom;
var nproperty;
var rData;

function myFunction (x, callback){
  // do stuff
    if(x == 2){
        obj = { tarea: narea, troom: nroom, tproperty: nproperty };
        console.log("func call "+ JSON.stringify(obj) );
        zTest.getZillow();
        
    }
    // give enough time for scrape script to run 
    setTimeout(callback, 2000);
    
}

/* GET users listing. */
router.get('/:area/:room/:property', function(req, res, next) {
   // zTest.getZillow();
    
        narea = req.params.area;
        nroom = req.params.room;
        nproperty = req.params.property;  

    myFunction(2, function(){
        rData = JSON.stringify(zTest.houseObj);
        //console.log(rData);
        console.log("Callback function " )
        res.render('submit', { title: 'Zillow Project', area: narea, room: nroom, property: nproperty, zillowdata: rData});
    });

  //res.send('respond with a resource');
});

module.exports.rData = rData;
module.exports.obj = obj;
module.exports = router;

