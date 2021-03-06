const express = require('express');
const bodyParser= require('body-parser');
const mongoose=require('mongoose');
const app = express();
mongoose.connect("mongodb+srv://Rehan:Alexa693@cluster0.2wzmd.mongodb.net/locationDB?retryWrites=true&writeConcern=majority/locationDB ",{ useUnifiedTopology: true }, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true})) ;
app.set('view engine','ejs');


// ===============MONGOOSE SCHEMA FOR GETTING VICTIM LATITUDE AND Longitude===================================================================================================

const locationSchema=new mongoose.Schema({
lat:Number,
lng:Number,
});
const Location=mongoose.model("Location",locationSchema);



//=================================================POLICE SERVER========================================

var lat;//= -31.56389;
var lng;//= 147.158700;
var start_lat;//=coordinates[0].lat;
var start_lng;//=coordinates[0].lng;

var end_lat;//=coordinates[coordinates.length-1].lat;

var end_lng;//= coordinates[coordinates.length-1].lng;
var flightPlanCoordinates;
app.get("/police",function (req,res) {

	Location.find(function(err,locations){//RETRIVING LAT AND LNG FROM MONGO DATABASE
  if(err){
  console.log(err);
  }
  else{
  start_lat=locations[0].lat;
	start_lng=locations[0].lng;
	end_lat=locations[locations.length-1].lat;
	end_lng=locations[locations.length-1].lng;
	lat=end_lat;
	lng=end_lng;
 flightPlanCoordinates=locations;
 if(locations.length===0){
 res.render("police",{distance:0,lat_c:0,lng_c:0,lat:37.0902,lng:95.7129,start_lat:0,start_lng:0,end_lat:0,end_lng:0,vicitm_lat:0,vicitm_lng:0,alert:0,zoom:5});
}
}
});

// ================Calculating distance travelled by victim===============
	var rad = function(x) {
	  return x * Math.PI / 180;
	};
	  var R = 6378137; // Earth’s mean radius in meter
	  var dLat = rad(end_lat-start_lat);
	  var dLong = rad(end_lng - start_lng);
	  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	    Math.cos(rad(start_lat)) * Math.cos(rad(end_lat)) *
	    Math.sin(dLong / 2) * Math.sin(dLong / 2);
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	  var d = parseInt(R * c);
console.log("The distance travelled by victim is "+d+" meters");
// ================Calculating distance travelled by victim end===============


res.render("police",{distance:d,lat_c:lat,lng_c:lng,lat:lat,lng:lng,start_lat:start_lat,start_lng:start_lng,end_lat:end_lat,end_lng:end_lng,vicitm_lat:lat,vicitm_lng:lng,alert:1,zoom:19});

})



// ===============================================POLICE SRVER END========================================








//==============================================VICTIM GET AND POST REQUEST====================================

//
// var c=5;
// app.get("/",function (req,res) {
// 	res.render("index",{id:c,i:2});
// 	var location=new Location({//SENDING COMMENT TO database
// 		lat: -31.56389,
//  	 lng: 147.158700
// 	});
// location.save();
// })
// ==========CONTINUOUSLY SENDING LAT AND LNH(VICTIM SERVER)===============
// app.post("/",function(req,res) {
//
// 	res.render("index",{id:c,i:2});
// var a=req.body.lat;
// var b=req.body.lng;
// console.log("The longitude is "+a+"\n");
// console.log("The latitude is "+b+"\n");
//
// 	c++;
//
//
//
// })








app.listen(3000,function() {
	console.log("The server is running");
})
