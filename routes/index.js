var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();


var urlencodedParser = bodyParser.urlencoded({ extended: false })
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("render homepage");
  res.render('index', { title: 'Zillow Project' });    
});

// requesting data from zillow
router.post('/submit', function(req, res, next){
   console.log("request to submit");
    //console.log(req)
    var area = req.body.area;
    var room = req.body.room;
    var property = req.body.property;
    
    res.redirect('/submit/'+area+'/'+room+'/'+property)
  //  res.render('submit');
});

module.exports = router;
