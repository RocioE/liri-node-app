require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require('axios');
var moment = require('moment');


// Base URL: rest.bandsintown.com 
// npm install//
// added all VAR above as per HW instructions
// var axios = require('axios');   ***must have it above!!****
// var moment = require('moment'); ***must have it above!!****
// Spotify:  Client ID bbc30ce414774a21816f7c1ec260d53a
// Client Secret 4f853a51f0d644e8a3275c734002ac4c
// OMD Api Key= 4ca5a322
// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=4ca5a322
// npm package.json file.
// *HW Instructions: Make it so liri.js can take in one of the following commands:
// concert-this-   done*
// spotify-this-   done*
// movie-this      done*
// do-what-it-says*  function??How?/




var fs = require("fs");
var funcSearch = process.argv[2];
var KeySearch = process.argv[3];

// Bands In Town:
var concertUrl = "https://rest.bandsintown.com/artists/" + KeySearch + "/events?app_id=codingbootcamp";
var movieUrl = "http://www.omdbapi.com/?t=" + KeySearch + "&y=&plot=short&apikey=trilogy";

// funtion & axios (promise) for "concert-this"//
if (funcSearch === 'concert-this') {
    axios.get(concertUrl).then(
        function (concertResponse) {
            for (var i in concertResponse.data) {
                console.log("Name of the venue: " + concertResponse.data[i].venue.name);
                console.log("Venue location: " + concertResponse.data[i].venue.city + " " + concertResponse.data[i].venue.city.country);
                console.log("Date of the Event: " + concertResponse.data[i].datetime);
                //"Date of the Event"(use moment to format this as "MM/DD/YYYY")
            }
        })
}

//Spotify function for spotify-this-song '<song name here>'//
// searchfunction in spotify:
// function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);
if (funcSearch === 'spotify-this-song') {
    spotify.search({ type: 'track', query: KeySearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // JSON.stringify() method converts a JavaScript object or value to a JSON string/ from 0 to 3 string//
        var dataArray = JSON.stringify(data, null, 3)
        for (var i in data.tracks.items) {
            console.log('Artist Name: ' + data.tracks.items[i].album.name);
            console.log('Song Name: ' + data.tracks.items[i].name);
            console.log('Preview song URL: ' + data.tracks.items[i].preview_url);
            console.log('Album: ' + data.tracks.items[i].album.artists[i].name);
        }
    });
}

//***do the same for if (funcSearch === 'movie-this') {
// axios.get(movieUrl).then((response)=>{ */
//     and 
// if (funcSearch === 'movie-this')  last left off on Sunday 11:25pm

if (funcSearch === 'movie-this') {
    axios.get(movieUrl).then((response) => {
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("Rating: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
        console.log("Country where the movie was produced: " + response.data.Country);
        console.log("Language of the movie: " + response.data.Language);
        console.log("Plot of the movie: " + response.data.Plot);
        console.log("Actors in the movie: " + response.data.Actors);
        console.log(err);
    }).catch(err=>{
        console.log(err)
    })
}



// I NEED HELP Here - 8/18!!!!!*******
// var funsearch= do-what-it-says, 
if (funcSearch === 'do-what-it-says') {

    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data)

    })
     }

    //You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.






