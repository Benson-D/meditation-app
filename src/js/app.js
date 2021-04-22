import 'core-js/stable';
import 'regenerator-runtime/runtime';

//Home
const menu = document.querySelector('.menu');
const section1 = document.querySelector('.section-main');
const meditate = document.querySelector('.meditate');

//Control Audio
const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.next');
const backBtn = document.querySelector('.back');
const playSvg = document.querySelector('.control__buttons--play');
const pauseSvg = document.querySelector('.control__buttons--pause');
const audio = document.querySelector('.audio-selection');

//Timer
const selectEl = document.querySelector('.timer__select');
const timer = document.querySelector('.countDown');
let startTime = 300;

///////Functions

//Menu Home Page
const display = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) menu.classList.add('display');
  if (entry.isIntersecting) menu.classList.remove('display');
};

const sectionObserve = new IntersectionObserver(display);
sectionObserve.observe(section1, {
  root: null,
  threshold: 0,
});

//Play / Pause
const togglePlay = () => {
  audio.paused ? audio.play() : audio.pause();
};

//Switch
const toggleSwitch = () => {
  playSvg.classList.toggle('display');
  pauseSvg.classList.toggle('display');
};

//Count Down
const timeDuration = time => {
  let min = Math.trunc(time / 60);
  let sec = String(Math.floor(time % 60)).padStart(2, 0);
  timer.textContent = `${min}:${sec}`;
};

audio.ontimeupdate = function () {
  let curTime = audio.currentTime;
  let countDown = startTime - curTime;
  timeDuration(countDown);

  if (curTime >= startTime) {
    audio.pause();
    audio.currentTime = 0;
  }
};

//Buttons
selectEl.addEventListener('input', function (e) {
  let select = e.target;
  startTime = select.value;
  timeDuration(startTime);
});

playBtn.addEventListener('click', function () {
  togglePlay();
  toggleSwitch();
});

nextBtn.addEventListener(
  'click',
  () => (location.href = 'http://localhost:1234/src/html/river.html')
);

backBtn.addEventListener('click', () => {
  location.href = 'http://localhost:1234/src/html/ocean.html';
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    location.href = 'http://localhost:1234/src/html/river.html';
  }

  if (e.key === 'ArrowLeft') {
    location.href = 'http://localhost:1234/src/html/ocean.html';
  }

  if (e.key === ' ') {
    togglePlay();
    toggleSwitch();
  }
});
