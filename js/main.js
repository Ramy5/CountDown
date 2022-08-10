"use strict";

// selection elements
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".close");
const input = document.querySelector(".date-input");
const done = document.querySelector(".done");
const days = document.querySelector(".day");
const hours = document.querySelector(".hour");
const minutes = document.querySelector(".minute");
const seconds = document.querySelector(".second");
const startSound = new Audio("sounds/start.wav");
startSound.volume = 0.5;
const endSound = new Audio("sounds/end.wav");
endSound.volume = 0.5;

// for date
let dateDefault;
let dateToday;
let different;

// after 1 second show popup
setTimeout(() => {
  popup.classList.remove("hidden");
  input.focus();
}, 1000);

// when i press on close button delete popup
closePopup.addEventListener("click", function () {
  popup.classList.add("hidden");
});

// when i press enter click done
window.addEventListener("keyup", function (e) {
  if (e.key === "Enter" || e.key === "Escape") done.click();
});

// when i press on done button
done.addEventListener("click", function () {
  const interval = setInterval(() => {
    if (input.value === "") {
      dateDefault = new Date("Dec 31, 2022 23:59:59").getTime();
      dateToday = new Date().getTime();
      different = dateDefault - dateToday;
    } else {
      dateDefault = new Date(`${input.value}`).getTime();
      dateToday = new Date().getTime();
      different = dateDefault - dateToday;
    }
    // maniplate input value to convert it
    let day = Math.trunc(different / (1000 * 60 * 60 * 24));
    let hour = Math.trunc(
      (different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minute = Math.trunc((different % (1000 * 60 * 60)) / (1000 * 60));
    let second = Math.trunc((different % (1000 * 60)) / 1000);

    // add manipulate to element in page
    days.textContent =
      day < 10 ? `00${day}` : day > 10 && day < 100 ? `0${day}` : day;
    hours.textContent = hour < 10 ? `0${hour}` : hour;
    minutes.textContent = minute < 10 ? `0${minute}` : minute;
    seconds.textContent = second < 10 ? `0${second}` : second;

    // finish interval
    if (different < 0) {
      clearInterval(interval);
      endSound.play();
    }
  }, 1000);
  popup.classList.add("hidden");
  startSound.play();
});
