// Iteration 1: Declare variables required for this game
var gameBody = document.getElementById("game-body");
var timer = document.getElementById("timer").innerText;
var max_lives = document.getElementById("max-lives");
var lives = document.getElementById("lives");
const img = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png",
]; 

// Iteration 1.2: Add shot
const expAudio = new Audio(
    "https://freespecialeffects.co.uk/soundfx/weapons/shotgun_3.wav"
);

expAudio.volume = 0.2;
gameBody.onclick = () => {
    expAudio.pause();
    expAudio.currentTime = 0;
    expAudio.play();
}
// Iteration 1.3: Add background sound

const backgroundSound = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/soundtrack.mp3"
);
backgroundSound.play();
backgroundSound.loop = true;

// Iteration 1.4: Add lives
max_lives = 5;
lives = 5;
var zombieId = 1;
// Iteration 2: Write a function to make a zombie
const zombie_display = () => {
    var image = img[GetRamdomNumber(0, img.length)];
    gameBody.innerHTML += `<img src= "./assets/${image}" class="zombie-image" id="zombie${zombieId}">`;
    let zombie = document.getElementById("zombie" + zombieId)
    zombie.style.transform = `translateX(${GetRamdomNumber(10, 80)}vw)`
    zombie.style.animationDuration = `${GetRamdomNumber(2, 6)}s`
    zombie.onclick = () => {
        destroy(zombie); 
    }
}
// Iteration 3: Write a function to check if the player missed a zombie

const zombieMissed = (zombie) => {
    if(zombie.getBoundingClientRect().top <= 0){
        lives--;
        return true;
    }
    else{
        return false;
    }
}
// Iteration 4: Write a function to destroy a zombie when it is shot or missed
const destroy = (zombie) => {
    zombie.style.display = "none";
    zombieId++;
    zombie_display();
}
// Iteration 5: Creating timer

var timerId = setInterval(function(){
    timer--;
    document.getElementById("timer").textContent = timer;

    if (timer == 0){
        clearInterval(timerId);
        window.location.href = "./win.html";
    }

    let zombie = document.getElementById("zombie" + zombieId);
    if (zombieMissed(zombie)){
        destroy(zombie);

        if (lives == 0){
            clearInterval(timerId);
            window.location.href = "./game-over.html";
        }
    }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie

zombie_display(zombieId);

// Iteration 7: Write the helper function to get random integer

function GetRamdomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}




