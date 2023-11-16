const gameContainer = document.getElementById("gameContainer");
const scoreRoot = document.getElementsByClassName("scoreRoot");
const points = document.getElementById("score");
const timer = document.getElementById("timer");
const  myCardElement = document.getElementsByClassName("cardBack");
const throttledClick = throttle(filpCounter, 1000);
const arr = [
  "#363062",
  "#4D4C7D",
  "#F99417",
  "#F5F5F5",
  "#0802A3",
  "#FF4B91",
  "#FF7676",
  "#FFCD4B",
];
const doubleArr = arr.concat(arr);
let sec = 0;
let minutes = 0;
let timeCount;
let counter = [];
let score = 0;
let startTime;
shuffleCard();
cardCreate();


function shuffleCard() {
  try{
    for (let i = doubleArr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    [doubleArr[i], doubleArr[randomIndex]] = [
      doubleArr[randomIndex],
      doubleArr[i],
    ];
  }
  }
  catch(error){
    return error;
  }

}
function cardCreate() {
  try{
      doubleArr.forEach((color, index) => {
    const cards = document.createElement("div");
    cards.setAttribute("id", index);
    cards.classList.add("cardBack");
    cards.classList.add("active");

    gameContainer.appendChild(cards);
    cards.addEventListener("click", throttledClick);
  });
  }
  catch(error){
    return error;
    }

}

function filpCounter() {
  try{
    if (counter.length < 2 && this.classList.contains("active")) {

    let idTaker = this.getAttribute("id");
    if (!counter.some((checker) => checker.getAttribute("id") === idTaker)) {
      counter.push(this);
      this.classList.remove("cardBack");
      // idTaker.style.backgroundColor =doubleArr[idTaker];
      this.style.backgroundColor = doubleArr[idTaker];
    
      console.log(counter);
      if (counter.length === 2) {
        setTimeout(() => {
          pairChecker();
        }, 1000);
      }
    }
  }
  }
  catch(error){
    return error;
  }
}
function throttle(func, delay) {
  let lastTime = 0;

  return function () {
    const currentTime = new Date().getTime();
    if (currentTime - lastTime >= delay) {
      func.apply(this, arguments);
      lastTime = currentTime;
    }
  };
}
function pairChecker() {
  try{
     let counter1 = counter[0].getAttribute("id");
  let counter2 = counter[1].getAttribute("id");

  if (doubleArr[counter1] === doubleArr[counter2]) {
    counter[0].style.border = "";
    counter[1].style.border = "";
    counter[0].style.display = "";
    counter[1].style.display = "";
    counter[0].classList.remove("active");
    counter[1].classList.remove("active");

    score += 10;
    points.innerHTML = "POINTS:" + score;
    points.style.color = "red";

    gameOver();
  } else {
    console.log("suceess")
    counter[0].classList.add("cardBack");
    counter[1].classList.add("cardBack");
    // counter[0].style.backgroundColor = 'none';
    // counter[1].style.backgroundColor = 'none';
    counter[0].innerHTML = "";
    counter[1].innerHTML = "";
  }
  counter = [];
  }
  catch(error){
    return error;
  }
 
}

function gameOver() {
  try{
      if (score === 80) {
    const endTime = new Date();
     clearInterval(timeCount);
      const elapsedTime = endTime - startTime;
      const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60));
      const elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
      console.log(elapsedMinutes);
      console.log(elapsedSeconds);
     const finalScore=score;
    const url = `scoreBoard.html?score=${finalScore}&minuteTime=${elapsedMinutes}&secondTime=${elapsedSeconds}`;
    window.location.href = url;
    }

  }
  catch(error){
    return error;
  }


}


(function () {
  points.innerHTML = "POINTS: 0";
  startTime = new Date();
  timeCount = setInterval(() => {
    sec++;
    if (sec === 60) {
      sec = 0;
      minutes++;
    }
    timer.innerHTML = `${minutes}:${sec}`;
  }, 1000);
})();





 