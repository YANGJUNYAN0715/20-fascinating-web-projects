const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Number:", randomNum);

const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

recognition.start();

function writeMessage() {
  msgEl.innerHTML = `
  <div>You said:</div>
  <span class="box">${msg}</span>
  `;
}

function checkNumber(msg) {
  const num = +msg;
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>That is not a valid number</div>";
    return;
  }
  if (num > 100 || num < 1) {
    msgEl.innerHTML = `<div>Number must be between 1 and 100</div>`;
    return;
  }
  if (num === randomNum) {
    document.body.innerHTML = `<h2>Congrats! You win! <br></br> It was ${num} </h2>
    <button class="play-again" id="play-again">Play again</button>'`;
  } else if (num > randomNum) {
    msgEL.innerHTML = `<div>GO LOWER</div>`;
  } else {
    msgEL.innerHTML = `<div>GO HIGHER</div>`;
  }
}

function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

recognition.addEventListener("result", onSpeak);

recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-agin") {
    window.location.reload();
  }
});
