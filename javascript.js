let index = 1;
let audio; // Declare audio globally
let progressBar = document.getElementById("progressBar");
let currentSong = new Audio();

const songObj = {
    1: "song/JIMMYCHOOCHOO.mp3",
    2: "song/KHAAB_AKHIL.mp3",
    3: "song/kisiKiMuskurahto.mp3",
    4: "song/KoiViNai.mp3",
    5: "song/mascara.mp3",
    6: "song/MereSamneValiKhidkiMai.mp3",
    7: "song/MereSapnoKiRaniKab.mp3",
    8: "song/MereTuHiTuTHai.mp3",
    9: "song/milloNa.mp3",
    10: "song/TuKiHaiMere.mp3",
    11: "JeeneLagaHoon.mp3"
};

currentSong.src = songObj[1]
document.getElementById("songInfo").innerHTML = songObj[1].replace("song/", "")

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "invalid input";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

function main() {

    // show the list of the  song left side of the website 
    let songHTML = "";
    for (let index = 1; index <= Object.keys(songObj).length; index++) {
        let temp = songObj[index].replace("song/", "");
        // console.log(temp);
        songHTML += `<li><p>${temp}</p><img
src = "data:image/png;base64,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"
        > </li>`;
    }
    document.getElementById("ListOfsong").innerHTML = songHTML


    // functionality of play music from the song list
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        let songPath = "song/" + e.querySelector("p").outerText;
        e.addEventListener("click",
            Element => {
                console.log(songPath);
                playMusic(songPath)
            });
        // let songPath = "song/" + e.querySelector("p").outerText;

    })


    // Functionality of play song previous button
    // Functionality of play song next button

    function playMusic(songName) {
        console.log("music is playing");
        currentSong.src = songName
        currentSong.play()
        document.getElementById("playSong").src = "pause.svg";
        document.getElementById("songInfo").innerHTML = songName.replace("song/", "")
    }


    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;

        let percent = (currentSong.currentTime / currentSong.duration) * 100
        const seekBarLeft = percent + "%";
        document.querySelector(".circle").style.left = seekBarLeft
    })

    document.querySelector(".seekBar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100
    })
}




// Functionality of play song play button
function playSong() {
    if (currentSong.paused) {
        document.getElementById("playSong").src = "pause.svg";
        currentSong.play();
        console.log("music is playing")

    } else {
        document.getElementById("playSong").src = "playSong.svg";
        currentSong.pause();
        console.log("music is paused")

    }
}


main();



document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0%"
})







// code with chat gpt



// function togglePlay() {
//     if (audio) {
//         if (audio.paused) {
//             audio.play();
//             document.getElementById("songInfo").innerHTML = "Now playing: " + songObj[index].replace("song/", "");
//             console.log("Now playing: " + songObj[index]);
//         } else {
//             audio.pause();
//             document.getElementById("songInfo").innerHTML = "Paused: " + songObj[index].replace("song/", "");
//             console.log("Paused: " + songObj[index]);
//         }
//     } else {
//         audio = new Audio(songObj[index]);
//         audio.play();
//         document.getElementById("songInfo").innerHTML = "Now playing: " + songObj[index].replace("song/", "");
//         console.log("Now playing: " + songObj[index]);
//     }

//     // Update progress bar during playback
//     audio.addEventListener("timeupdate", updateProgressBar);
// }

// function updateProgressBar() {
//     const value = (audio.currentTime / audio.duration) * 100;
//     progressBar.value = value;
// }

// function seek(event) {
//     const percent = event.offsetX / progressBar.offsetWidth;
//     audio.currentTime = percent * audio.duration;
// }

// function next() {
//     if (index < 10) {
//         index++;
//     } else {
//         index = 1;
//     }
//     // If audio is playing, switch to the next song without interruption
//     if (audio && !audio.paused) {
//         audio.src = songObj[index];
//         document.getElementById("songInfo").innerHTML = "Now playing: " + songObj[index].replace("song/", "");
//         console.log("Now playing: " + songObj[index]);
//     } else {
//         togglePlay(); // Play the next song
//     }
// }

// function previous() {
//     if (index > 1) {
//         index--;
//     } else {
//         index = 10;
//     }
//     // If audio is playing, switch to the previous song without interruption
//     if (audio && !audio.paused) {
//         audio.src = songObj[index];
//         document.getElementById("songInfo").innerHTML = "Now playing: " + songObj[index].replace("song/", "");
//         console.log("Now playing: " + songObj[index]);
//     } else {
//         togglePlay(); // Play the previous song
//     }
// }