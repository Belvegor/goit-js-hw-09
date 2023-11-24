const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

let colorChangeInterval; // interwał zmiany koloru
let isColorChanging = false; // czy zmiana koloru zachodzi?

// funkcja zmiany koloru
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// obsługa kliknięcia start
startButton.addEventListener('click', () => {
  if (!isColorChanging) {
    isColorChanging = true;
    startButton.disabled = true; // dezaktywuje start

    colorChangeInterval = setInterval(() => {
      const randomColor = getRandomHexColor();
      body.style.backgroundColor = randomColor;
    }, 1000);

  }
});

// obsługa kliknięcia stop
stopButton.addEventListener('click', () => {
  clearInterval(colorChangeInterval);
  isColorChanging = false;
  startButton.disabled = false; // aktywny start
});