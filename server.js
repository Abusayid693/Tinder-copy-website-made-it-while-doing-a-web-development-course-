const express = require('express');
const bodyParser= require('body-parser');
const mongoose=require('mongoose');
const fetch = require('node-fetch');
const app = express();
mongoose.connect("mongodb+srv://Rehan:Alexa693@cluster0.2wzmd.mongodb.net/locationDB?retryWrites=true&writeConcern=majority/locationDB ",{ useUnifiedTopology: true }, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true})) ;
app.set('view engine','ejs');
app.use(express.static("assets"));

// ===============MONGOOSE SCHEMA FOR GETTING VICTIM LATITUDE AND Longitude===================================================================================================

const locationSchema=new mongoose.Schema({
lat:Number,
lng:Number,
});
const Location=mongoose.model("Location",locationSchema);

const registrationSchema=new mongoose.Schema({
username:String,
password:String,
});
const Register=mongoose.model("Register",registrationSchema);


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
 else if(locations.length===0){
 res.render("police",{distance:0,lat_c:0,lng_c:0,lat:37.0902,lng:95.7129,start_lat:0,start_lng:0,end_lat:0,end_lng:0,vicitm_lat:0,vicitm_lng:0,alert:0,zoom:5});
}
else{
start_lat=locations[0].lat;
start_lng=locations[0].lng;
end_lat=locations[locations.length-1].lat;
end_lng=locations[locations.length-1].lng;
lat=end_lat;
lng=end_lng;
flightPlanCoordinates=locations;
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

app.get("/",function(req,res){
res.render("SOS");
})

app.post("/",async function(req,res){
	var lat=req.body.latitude;
	var lng=req.body.longitude;

	var location=new Location({//SENDING COMMENT TO database
			lat: lat,
		lng: lng
		});
	location.save();
	// The API key for the reverse geocoding API is an environment variable
	const APIKEY = process.env.POSITIONAPIKEY;
	// Call the reverse GeoCoding API to get the location details
	const locationResponse = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${APIKEY}&query=${lat},${lng}`);
	// Returns an array of all near by locations
	const locationJSON = await locationResponse.json();
	// Get the data array from the JSON
	const locationData = locationJSON['data'];
	
	let locationName = "Unknown location";
	let confidentIndex = 0;
	let maxConfidence = 0;
	// Each location returned by the API has a confidence level
	// Loop through the API to find the most confident location.
	for (let i=0; i<locationData.length; i++) {
		if(locationData[i]['confidence']>maxConfidence) {
			maxConfidence = locationData[i]['confidence'];
			confidentIndex = i;
		}
	}

	// Compute the name of the location using the details of the most confident location
	if(locationData.length > 0) {
		locationName = `${locationData[confidentIndex]['neighbourhood']} ,${locationData[confidentIndex]['locality']}, ${locationData[confidentIndex]['region']}, ${locationData[confidentIndex]['country']}`
	}
	const body = {
		email: 'avinashupadhya99@gmail.com', // Email of the police officer
		location: locationName
	};
	// Call novotize API to send email notification regarding the location
	const emailResponse = await fetch('https://events-api.notivize.com/applications/9bd047c4-ad22-49d7-b3d3-dbfeed1a8b3d/event_flows/a01f0c7f-abd3-425a-baca-ae55ed489be4/events', {
		method: 'post',
		body: JSON.stringify(body),
		headers: {'Content-Type': 'application/json'}
	});
	console.log(emailResponse);

	console.log(lat +"    "+lng);
	res.render("index");
})



app.post("/location", function(req,res){
	var lat=req.body.latitude;
	var lng=req.body.longitude;

	var location=new Location({//SENDING COMMENT TO database
			lat: lat,
		lng: lng
		});
	location.save();

	console.log(lat +"    "+lng);
	res.render("index");
})









app.listen(3000,function() {
	console.log("The server is running");
})
