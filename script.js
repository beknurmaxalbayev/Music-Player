const image= document.getElementById("photo");
const backImage= document.getElementById("full");
const title=document.querySelector('h2');
const artist=document.querySelector('h3');
const music=document.querySelector('audio');
const durationEl=document.getElementById("duration");
const currentTimeEl=document.getElementById("current-time");
const progressContainer=document.getElementById("progress-container");
const progressBar=document.getElementById("progress")
const prevBtn=document.getElementById("prev");
const playBtn=document.getElementById("play");
const nextBtn=document.getElementById("next");


const songs=[
    {
        name:'Бекнур Махалбаев',
        displayName:'Бозторғай Ана',
        artist:'bek',
        color:'rgba(0, 20,255, 0.9)'
    },

    {
        name:'Кайрат Нуртас',
        displayName:'Унсиз журек',
        artist:'bek',
        color:'rgb(253, 157, 0)'
    },

    {
        name:'Айдамир Мугу',
        displayName:'Чёрные глаза',
        artist:'bek',
        color:' linear-gradient(to left, #0f9b0f, #000000)'
    },

    {
        name:'Machenski',
        displayName:'Там тау адам',
        artist:'bek',
        color:'rgba(251, 6, 6, 0.979)'
    },

    {
        name:'Кенес Алимжан',
        displayName:'Оз журегиннен уялмайсынба',
        artist:'bek',
        color:'rgb(2, 161, 23)'
    },

    {
        name:'Жолдасбек Абдиханов',
        displayName:'Анашым аман жүрші',
        artist:'bek',
        color:'rgba(0, 20,255, 0.9)'
    },

    {
        name:'Ернар Айдар',
        displayName:'Ұнап қалдың анама',
        artist:'bek',
        color:'#000046'
    },

    {
        name:'Айқын Төлепберген',
        displayName:'Кундер отуде',
        artist:'bek',
        color:'rgba(0, 20,255, 0.9)'
    },

    {
        name:'Tural Everest и Руслан Добрый',
        displayName:'Карман',
        artist:'bek',
        color:'rgba(0, 20,255, 0.9)'
    },

    {
        name:'Төреғали Төреәлі, Қуандық Рахым, Әбдіжаппар Әлқожа, Ернар Айдар, Нұрболат Абдуллин, Қайрат Нұртас, Еркін Нұржанов',
        displayName:'Алаканымнан ушкан аккуым',
        artist:'bek',
        color:'rgba(0, 20,255, 0.9)'
    }



]






let isPlaying=false;

function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute("title","pause");
    music.play();
}

function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute("title","play")
    music.pause()
}

playBtn.addEventListener('click',() => ( isPlaying ? pauseSong() : playSong()));


//update the dom

function loadSong(song){
    artist.textContent=song.name;
    title.textContent=song.displayName;
    music.src=`music/${song.name}.mp3`
    image.src=`img/${song.name}.jpg`;
    document.body.style.background=song.color
}

let songIndex=0
loadSong(songs[songIndex]);


function prevSong(){

    songIndex--;

    if(songIndex<0){
        songIndex=songs.length-1
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();

}


function nextSong(){

    songIndex++;

    if(songIndex>songs.length-1){
        songIndex=0
    }

    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();

}

function updateProgress(e){
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // update progress bar width

        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
          durationSeconds = `0${durationSeconds}`;
        }
        // to avoid NaN
        if (durationSeconds) {
          durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
          currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
      }
}


function setProgressBar(e){
    
    const width =this.clientWidth;
      console.log('width',width);
    const clickX=e.offsetX;
    console.log('clickX',clickX);

     const { duration }=music;
    music.currentTime=(clickX/width)*duration;
    
}






prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgress)
progressContainer.addEventListener("click",setProgressBar);
