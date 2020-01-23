// const cards = Array.from(document.getElementsByTagName('section'));
const cards = Array.from(document.getElementsByClassName('card'));
// const cards = Array.from(document.querySelectorAll('.card'));
const fronts = cards.map(card => card.querySelectorAll('.front'));
// popup
const popup = document.querySelector('.popup');
let popText = popup.querySelector('p');
const showAttempts = document.getElementsByTagName('footer');
let card,
  firstCard,
  secondCard,
  frontOne,
  frontTwo,
  timer,
  matches = 0,
  selectedCards = 0,
  selected = false,
  lockBoard = false;

const totalMatches = cards.length / 2;
let totalAttempts = 0;

function flipCard() {
  // console.log(this)
  if (lockBoard) return;
  if (this === firstCard) return;
  card = Array.from(this.children);
  card.forEach(c => {
    // c.classList.add('flip')
    c.classList.toggle('flip');
  });

  if (!selected) {
    // first click
    selected = true;
    // save the card as first choice
    firstCard = this;
    frontOne = this.querySelector('.front');
  } else {
    // first click was made, this is the second
    // set selected back to false
    selected = false;
    secondCard = this;
    frontTwo = this.querySelector('.front');
    // check
    // frontOne.innerText == frontTwo.innerText ? disableCards() : flipBack();
    checkMatch();
  }
}
//
function checkMatch() {
  frontOne.innerText == frontTwo.innerText ? disableCards() : flipBack();
  totalAttempts++;
  showAttempts[0].innerText = `Attempts: ${totalAttempts}, matches ${matches}`;
}
function disableCards() {
  matches++;
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  if (matches === totalMatches) {
    setTimeout(() => {
      popText.innerText = 'you win';
      popup.classList.remove('hide');
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }, 1000);
  }
}
function flipBack() {
  // no clicks allowed
  lockBoard = true;
  setTimeout(() => {
    Array.from(firstCard.children).forEach(c => {
      c.classList.toggle('flip');
    });
    Array.from(secondCard.children).forEach(c => {
      c.classList.toggle('flip');
    });
    resetBoard();
  }, 1000);
}
// reset values
function resetBoard() {
  [selected, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// shuffle flex order
(function shuffleCards() {
  cards.forEach(card => {
    let suffle = Math.floor(Math.random() * cards.length);
    card.style.order = suffle;
  });
})();
//
cards.forEach(card => card.addEventListener('click', flipCard));
