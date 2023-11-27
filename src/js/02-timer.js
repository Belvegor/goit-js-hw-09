import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

function adjustElements() {
  const fieldElements = document.querySelectorAll('.field');
  const timerContainer = document.querySelector('.timer');
  const datePickerInput = document.getElementById('datetime-picker');
  const startButton = document.getElementById('startButton');

  fieldElements.forEach((field) => {
    const valueElement = field.querySelector('.value');
    const labelElement = field.querySelector('.label');

    field.style.display = 'flex';
    field.style.flexDirection = 'column';
    field.style.alignItems = 'center';

    valueElement.style.fontSize = '50px';
    valueElement.style.marginBottom = '5px';

    labelElement.style.fontSize = '20px';
  });

  timerContainer.style.display = 'flex';
  timerContainer.style.gap = '30px';
  timerContainer.style.marginLeft = '50px';

  datePickerInput.style.fontSize = '200%';
  startButton.style.fontSize = '200%';
}

document.addEventListener('DOMContentLoaded', () => {
  adjustElements();

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();

      if (selectedDate < currentDate) {
        Notiflix.Notify.warning('Please choose a date in the future');
        document.getElementById("startButton").disabled = true;
      } else {
        document.getElementById("startButton").disabled = false;
      }
    },
  };

  flatpickr("#datetime-picker", options);

  let countdownInterval;

  document.getElementById("startButton").addEventListener("click", () => {
    const selectedDate = flatpickr.parseDate(document.getElementById("datetime-picker").value);

    if (!selectedDate) {
      Notiflix.Notify.failure('Please select a valid date');
      return;
    }

    countdownInterval = setInterval(() => updateCountdown(selectedDate), 1000);
  });

  function updateCountdown(endDate) {
    const currentDate = new Date();
    const remainingTime = endDate - currentDate;

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success('Countdown finished!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    document.getElementById("days").innerText = addLeadingZero(days);
    document.getElementById("hours").innerText = addLeadingZero(hours);
    document.getElementById("minutes").innerText = addLeadingZero(minutes);
    document.getElementById("seconds").innerText = addLeadingZero(seconds);
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
  }
});