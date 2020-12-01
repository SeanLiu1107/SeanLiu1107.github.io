// Create your global variables below:
var tracklist = ["Let It Happen", "Nangs", "The Moment", "Yes I'm Changing", "Eventually", "Gossip", "The Less I Know The Better", "Past Life", "Disciples", "'Cause I'm A Man"];
var volLevels = [];
var volumeLevelNow;
var playedTime;
var interval;
var songNow = 6;
var playmusic = false;

/*This is the initial state when the user reloads the page*/
function init() {
	// Your code goes here
	var i;
	for (i=0; i<6; i++) {
		volLevels[i] = document.getElementById('vl' + i);
	}
	volLevels[0].style.backgroundColor = '#9f5cc4';
	volLevels[1].style.backgroundColor = '#9f5cc4';
	volLevels[2].style.backgroundColor = '#9f5cc4';
	document.getElementById('player-song-name').innerHTML = tracklist[6];
	volumeLevelNow = 3;
	playedTime = 0;
	switchPlay();
};

/*This function will check the upper boundary of the volume levels and increasely fill the volume level.*/
function volUp() {
	// Your code goes here
	if(volumeLevelNow < 6){
		volLevels[volumeLevelNow].style.backgroundColor = "#9f5cc4";
    	volumeLevelNow += 1;
	}
}

/*This function will check the lower boundary of the volume levels and decreasely remove the volume level.*/
function volDown() {
	// Your code goes here
	if(volumeLevelNow > 0){
		volLevels[volumeLevelNow-1].style.backgroundColor = "white";
    	volumeLevelNow -= 1;
	}
}

/*This function is to simulate the moving slider and convert the counts to the elapsed time*/
function moveslider() {
	if(playedTime >= 0 && playedTime <= 180){
		playedTime = document.getElementById("player-time").value;
		document.getElementById("time-elapsed").innerText = secondsToMs(++playedTime);
		document.getElementById("player-time").value = playedTime;
	}
	if(playedTime > 180) {
		nextSong();
	}
}

/*This function is to control the play button and pause button and activate the time slider*/
function switchPlay() {
	// Your code goes here
	if(!playmusic){
		playmusic = true;
		document.getElementById("play-pause").innerHTML = "pause";
		interval = setInterval(moveslider, 1000);
	}
	else{
		playmusic = false;
		document.getElementById("play-pause").innerHTML = "play_arrow";
		clearInterval(interval);
	}
}

/*This function is to change the current song to the next song. If this is the last song, then go to the fisrt song*/
function nextSong() {
	// Your code goes here
	playedTime = 0;
	document.getElementById("time-elapsed").innerText = secondsToMs(playedTime);
	document.getElementById("player-time").value = playedTime;
	if(++songNow>9) {
    	songNow = 0;
  	}
  	document.getElementById("player-song-name").innerText = tracklist[songNow];
}

/*This function is to change the current song to the previous song. If this is the first song, then go to the last song*/
function prevSong() {
	// Your code goes here
	playedTime = 0;
	document.getElementById("time-elapsed").innerText = secondsToMs(playedTime);
	document.getElementById("player-time").value = playedTime;
	if(--songNow<0) {
    	songNow = 9;
  	}
  	document.getElementById("player-song-name").innerText = tracklist[songNow];
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init();