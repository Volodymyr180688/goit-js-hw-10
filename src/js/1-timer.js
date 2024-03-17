import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.querySelector('[data-start]');
  const datetimePicker = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const userSelectedDate = selectedDates[0];

      if (userSelectedDate < new Date()) {
        startBtn.disabled = true;
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future'
        });
      } else {
        startBtn.disabled = false;
      }
    },
  });

  const daysValue = document.querySelector('[data-days]');
  const hoursValue = document.querySelector('[data-hours]');
  const minutesValue = document.querySelector('[data-minutes]');
  const secondsValue = document.querySelector('[data-seconds]');
  let timerInterval;
  let timerStarted = false;

  function addLeadingZero(value) {
    return value < 10 ? '0' + value : value;
  }

  function calculateTimeDifference(endDate) {
    const msDifference = endDate - new Date();
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(msDifference / day);
    const hours = Math.floor((msDifference % day) / hour);
    const minutes = Math.floor(((msDifference % day) % hour) / minute);
    const seconds = Math.floor((((msDifference % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  function updateTimer(endDate) {
    const timeDifference = calculateTimeDifference(endDate);

    daysValue.textContent = addLeadingZero(timeDifference.days);
    hoursValue.textContent = addLeadingZero(timeDifference.hours);
    minutesValue.textContent = addLeadingZero(timeDifference.minutes);
    secondsValue.textContent = addLeadingZero(timeDifference.seconds);

    if (timeDifference.days === 0 && timeDifference.hours === 0 && timeDifference.minutes === 0 && timeDifference.seconds === 0) {
      clearInterval(timerInterval);
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished'
      });
      startBtn.disabled = false;
      datetimePicker.input.disabled = false;
      timerStarted = false;
    }
  }

  startBtn.addEventListener('click', () => {
    if (!timerStarted) {
      startBtn.disabled = true;
      datetimePicker.input.disabled = true;
      const endDate = datetimePicker.selectedDates[0];
      updateTimer(endDate);
      timerInterval = setInterval(() => {
        updateTimer(endDate);
      }, 1000);
      timerStarted = true;
    } else {
      location.reload();
    }
  });
});