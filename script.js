let mainImg = document.querySelector(".mainSongImage");
let mainName = document.querySelector(".mainSongName");
let mainArtist = document.querySelector(".mainSongArtist");


let footerImage = document.querySelector(".currentSongImg")
let footerSongName = document.querySelector(".currentSongName")
let footerArtist = document.querySelector(".currentSongArtist")


let playPauseButton = document.querySelector(".playPauseSong");
let nextButton= document.querySelector(".nextSong");
let previousButton = document.querySelector(".previousSong");

let songBar = document.querySelector(".songBar");
let volumeBar = document.querySelector(".volumeBar");
let currentTime = document.querySelector(".currentTime");
let totalDuration = document.querySelector(".totalDuration");

let songIndex = 0;
let isPlaying = false;
let updateTimer;

let currentTrack = document.createElement('audio');

let songList = [
    {
        name:"Track 1",
        artist: "DJ John",
        image: "https://wallpapercave.com/wp/wp4893912.jpg",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },

    {
        name:"Track 2",
        artist: "DJ XYZ",
        image: "https://wallpapercave.com/wp/wp8973943.jpg",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },

    {
        name:"Track 3",
        artist: "DJ Bravo",
        image: "https://wallpapercave.com/wp/wp7293879.png",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    },
];

function loadTrack(){
    clearInterval(updateTimer);
    resetvalue();
    currentTrack.src = songList[songIndex].path;
    currentTrack.load();

    mainImg.style.backgroundImage = "url(" +songList[songIndex].image+ ")";
    mainName.textContent = songList[songIndex].name;
    mainArtist.textContent = songList[songIndex].artist;

    footerImage.children[0].src = songList[songIndex].image
    footerSongName.textContent = songList[songIndex].name;
    footerArtist.textContent = songList[songIndex].artist;

    updateTimer = setInterval(seekUpdate, 1000);
    currentTrack.addEventListener("ended",nextTrack);

}

function resetvalue(){
    currentTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    songBar.value = 0;
}

loadTrack(songIndex);

function playPauseSong(){
    if(!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack(){
    currentTrack.play();
    isPlaying = true;
    playPauseButton.innerHTML = `<i class="fa fa-pause-circle fa-3x"></i>`;
}

function pauseTrack(){
    currentTrack.pause();
    isPlaying = false;
    playPauseButton.innerHTML = `<i class="fa fa-play-circle fa-3x"></i>`;
}


function nextTrack(){
    if(songIndex < songList.length-1)
    songIndex +=1;
    else songIndex = 0;

    loadTrack(songIndex)
    playTrack();
}

function previousSong(){
    if(songIndex > 0)
    songIndex -=1;
    else songIndex = songList.length;

    loadTrack(songIndex)
    playTrack();
}

function seekTo(){
    let seek = currentTrack.duration * (songBar.value /100);
    currentTrack.currentTime = seek;
}

function setVolume(){
    currentTrack.volume = volumeBar.value/100;
}

function seekUpdate(){
    let seekPosition = 0;
    if(!isNaN(currentTrack.duration)){
        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        songBar.value = seekPosition;


        let curMin = Math.floor(currentTrack.currentTime /60);
        let curSec = Math.floor(currentTrack.currentTime - curMin);

        let durMin = Math.floor(currentTrack.duration / 60);
        let durSec = Math.floor(currentTrack.duration - durMin);

        if(curSec < 10){curSec = "0" + curSec;}
        if(durSec < 10){durSec = "0" + durSec;}
        if(curMin < 10){curMin = "0" + curMin;}
        if(durMin < 10){durMin = "0" + durMin;}

        currentTime.textContent = curMin + ":" + curSec;
        totalDuration.textContent = durMin + ":" + durSec;
    }
}