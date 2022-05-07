const inputNumber = document.querySelector('.input-number');
const submitBtn = document.querySelector('.submit-btn');
const resetBtn = document.querySelector('.reset-btn');
const widget = document.querySelector('.widget');
let prevNum = document.querySelector('.prev-nums');
let remainTurns = document.querySelector('.remain-turns');
let randomNum = Math.floor(Math.random() * 5) + 1;
console.log(randomNum);

let guessCount = 3;

const guess_game = (e) => {
  guessCount--;
  let guessNum = Number(inputNumber.value);
  // Initialise wrong nums
  widget.classList.add('active');
  if (guessCount === 2) {
    prevNum.innerHTML = `
       <p style="font-weight: 500; background: rgba(5, 87, 135, 0.3);">Previous numbers: </p>
    `;
  }
  prevNum.innerHTML += `${guessNum}, `;
  // display remaining turns
  remainTurns.innerText = `Remain turns: ${guessCount}`;

  // win or loose
  if (guessNum === randomNum) {
    win_or_loose(true);
  } else if (guessCount === 0) {
    win_or_loose(false);
  }
  inputNumber.focus();
  inputNumber.value = '';
};

const win_or_loose = (won) => {
  let guesssMessage = document.createElement('h2');
  guesssMessage.classList.add('guess-msg');
  if (won) {
    guesssMessage.innerText = 'You Won!';
    guesssMessage.classList.add('won');
    create_reset_btn(guesssMessage);
  } else {
    guesssMessage.innerText = 'You Lost!';
    guesssMessage.classList.add('lost');
    create_reset_btn(guesssMessage);
  }
  document.body.append(guesssMessage);
};

const create_reset_btn = (msg) => {
  let reset_game_btn = document.createElement('button');
  reset_game_btn.classList.add('reset-game');
  reset_game_btn.innerText = 'New Game';
  document.querySelector('.num-guesser-app').append(reset_game_btn);
  submitBtn.disabled = true;
  inputNumber.disabled = true;
  widget.classList.remove('active');
  reset_game_btn.addEventListener('click', () => {
    new_game_btn(msg);
  });
};

const new_game_btn = (msg) => {
  randomNum = Math.floor(Math.random() * 5) + 1;
  console.log(randomNum);
  prevNum.textContent = '';
  msg.innerText = '';
  remainTurns.innerText = '';
  guessCount = 3;
  submitBtn.disabled = false;
  inputNumber.disabled = false;
  inputNumber.focus();
  document.querySelector('.reset-game').remove();
};

window.addEventListener('load', (e) => {
  inputNumber.focus();
});

submitBtn.addEventListener('click', guess_game);
