var request = require("request");
var Spotify = require("node-spotify-api");
var spotify = new Spotify({
  id: "b0e1ea105e934e708fbcf92f101042cc",
  secret: "7e74c1885b9641f5b9171f0eedaa42e1"
});
var movie = "";
var fs = require("fs");
var input = process.argv[2];
var song =""

if (input == "spotify-this-song"){
	for(i=3; i<process.argv.length; i++){
		song += " "+ process.argv[i];
	}
	if (song == ""){
		var song = "The Sign";
	}
	console.log(song);
	spotify.search({type: "track", query: song}, function(error, data){
		if(!error){
			console.log("Artist: "+data.tracks.items[0].artists[0].name);
			console.log("Album: "+data.tracks.items[0].album.name);
			console.log("Song: "+data.tracks.items[0].name);
			console.log("Preview: "+data.tracks.items[0].preview_url);
		}
	})
}

else if(input == "movie-this"){
	for(i=3; i<process.argv.length; i++){
		movie +="+"+process.argv[i];
	}
	console.log(movie);
	var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";

	request(queryURL, function (error, response, body){
		if (!error && response.statusCode == 200){
			console.log("Title: "+JSON.parse(body)["Title"]);
			console.log("Year: "+JSON.parse(body)["Year"]);
			console.log("IMDB Rating"+JSON.parse(body)["imdbRating"]);
			console.log("Rotten Tomatoes Rating: "+JSON.parse(body)["tomatoRating"]);
			console.log("Country: "+JSON.parse(body)["Country"]);
			console.log("Language: "+JSON.parse(body)["Language"]);
			console.log("Plot: "+JSON.parse(body)["Plot"]);
			console.log("Actors: "+JSON.parse(body)["Actors"]);
		}
	});
}

else if (input == "do-what-it-says"){
	fs.readFile("random.txt", "utf8", function(error, data){
		var randomTxt = data.split(" ");
		var command = randomTxt[0];
		var search = "";
		for(i=1;i<randomTxt.length;i++){
		search +='+' + randomTxt[i];
		};
		song=search;
		console.log(command);
		console.log(song);
		spotify.search({type: "track", query: song}, function(error, data){
		if(!error){
			console.log("Artist: "+data.tracks.items[0].artists[0].name);
			console.log("Album: "+data.tracks.items[0].album.name);
			console.log("Song: "+data.tracks.items[0].name);
			console.log("Preview: "+data.tracks.items[0].preview_url);
		}
	})
	})
}
//else if the input is my-tweets
	//grab the dummy info and put it into the titter npm function
		//console log the past amount of tweets