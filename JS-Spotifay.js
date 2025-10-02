console.log("Welcome to Spotifay");
let songs = [
  { songName: "Baagi", filePath: "songs/baagi.mp3", coverPath: "covers/1.jpg" },
  { songName: "Mehebooba", filePath: "songs/mehebooba.mp3", coverPath: "covers/2.jpg" },
  { songName: "Ve Kamliya", filePath: "songs/vekamliya.mp3", coverPath: "covers/3.jpg" },
  { songName: "Sayiaraa", filePath: "songs/sayiaraa.mp3", coverPath: "covers/4.jpg" },
  { songName: "Teredilpehaqmera", filePath: "songs/teredilpehaq.mp3", coverPath: "covers/5.jpg" },
  { songName: "Barsaat", filePath: "songs/barsaat.mp3", coverPath: "covers/6.jpg" },
  { songName: "KeHoNaJayePyarTumse", filePath: "songs/kehonajaye.mp3", coverPath: "covers/7.jpg" },
  { songName: "Mulakat", filePath: "songs/mulakat.mp3", coverPath: "covers/8.jpg" },
  { songName: "Batao Zara", filePath: "songs/bataozara.mp3", coverPath: "covers/9.jpg" },
  { songName: "Papa Meri Jaan", filePath: "songs/papamerijaan.mp3", coverPath: "covers/10.jpg" }
];


let songIndex = 0;
let audioElement = new Audio(songs[songIndex].filePath);
// let audioElement=new Audio('baagi.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressBar = document.getElementById('myprogressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songitem'));


songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
});


masterPlay.addEventListener('click', () => {
  if(audioElement.paused || audioElement.currentTime <= 0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});


audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myprogressBar.value = progress;
});


myprogressBar.addEventListener('change', () => {
  audioElement.currentTime = myprogressBar.value * audioElement.duration / 100;
});


const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
};


Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
  });
});


document.getElementById('next').addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
});


document.getElementById('previous').addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
});
