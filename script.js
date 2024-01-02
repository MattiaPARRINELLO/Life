const elements = {
  input: document.querySelector("input"),
  button: document.querySelector("#submit"),
  pause: document.querySelector("#pause"),
  play: true,
  lastUpdate: new Date(),
  refresh: 1,
  lastUpdateEl: document.querySelector("#update"),
  sinceEL: document.querySelector("#timeSince"),
  birthDate: "",
  numberOfDigits: 7,
  age: {
    bigNum: document.querySelector("#AgeNum"),
    smallNum: document.querySelector("#AgeDec"),
  },
  lifeProg: {
    bigNum: document.querySelector("#LifeProgNum"),
    smallNum: document.querySelector("#LifeProgDec"),
    bar: document.querySelector("#LifeProgBar"),
  },
  yearProg: {
    bigNum: document.querySelector("#YearProgNum"),
    smallNum: document.querySelector("#YearProgDec"),
    bar: document.querySelector("#YearProgBar"),
  },
  monthProg: {
    bigNum: document.querySelector("#MonthProgNum"),
    smallNum: document.querySelector("#MonthProgDec"),
    bar: document.querySelector("#MonthProgBar"),
  },
  weekProg: {
    bigNum: document.querySelector("#WeekProgNum"),
    smallNum: document.querySelector("#WeekProgDec"),
    bar: document.querySelector("#WeekProgBar"),
  },
  dayProg: {
    bigNum: document.querySelector("#DayProgNum"),
    smallNum: document.querySelector("#DayProgDec"),
    bar: document.querySelector("#DayProgBar"),
  },
  hourProg: {
    bigNum: document.querySelector("#HourProgNum"),
    smallNum: document.querySelector("#HourProgDec"),
    bar: document.querySelector("#HourProgBar"),
  },
  minuteProg: {
    bigNum: document.querySelector("#MinuteProgNum"),
    smallNum: document.querySelector("#MinuteProgDec"),
    bar: document.querySelector("#MinuteProgBar"),
  },
  secondProg: {
    bigNum: document.querySelector("#SecondProgNum"),
    smallNum: document.querySelector("#SecondProgDec"),
    bar: document.querySelector("#SecondProgBar"),
  },
};

const setBirthDate = (date) => {
  elements.birthDate = date;
  elements.birthDate = new Date(elements.birthDate);
};

const getBirthDate = () => {
  elements.birthDate = localStorage.getItem("birthDate");
  if (elements.birthDate === null) {
    elements.birthDate = new Date();
  }
  elements.input.value = elements.birthDate;
  elements.birthDate = new Date(elements.birthDate);

  return elements.birthDate;
};

elements.input.addEventListener("change", (e) => {
  setBirthDate(e.target.value);
  localStorage.setItem("birthDate", e.target.value);
});
elements.button.addEventListener("click", () => {
  setBirthDate(elements.input.value);
  // store it in local storage
  localStorage.setItem("birthDate", elements.input.value);
});

const getAge = (today) => {
  // I want the age in year but with 8 decimals
  const age = (today - elements.birthDate) / 31536000000;
  return age.toFixed(elements.numberOfDigits + 2);
};

const getLifeProg = (today) => {
  // Based on the average life expectancy in France (82.5 years) and with 8 decimals
  const lifeProg = (getAge(today) / 82.5) * 100;
  return lifeProg.toFixed(elements.numberOfDigits + 2);
};

const getYearProg = (today) => {
  // How many percent of the year has passed with 8 decimals dont use birthdat
  const yearProg =
    (today - new Date(today.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24 * 365);
  return yearProg.toFixed(elements.numberOfDigits + 3);
};

const getMonthProg = (today) => {
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const monthDuration = endOfMonth - startOfMonth;
  const monthElapsed = today - startOfMonth;
  const monthProg = (monthElapsed / monthDuration) * 100;
  return monthProg.toFixed(elements.numberOfDigits);
};

const getWeekProg = (today) => {
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );

  const weekProg = ((today - startOfWeek) / (7 * 24 * 60 * 60 * 1000)) * 100;
  return weekProg.toFixed(elements.numberOfDigits);
};

const getDayProg = (today) => {
  const dayProg =
    ((today.getTime() % (24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)) * 100;
  return dayProg.toFixed(elements.numberOfDigits);
};

const getHourProg = (today) => {
  const hourProg =
    ((today.getTime() % (60 * 60 * 1000)) / (60 * 60 * 1000)) * 100;
  return hourProg.toFixed(elements.numberOfDigits);
};

const getMinuteProg = (today) => {
  const minuteProg = ((today.getTime() % (60 * 1000)) / (60 * 1000)) * 100;
  return minuteProg.toFixed(elements.numberOfDigits);
};

const getSecondProg = (today) => {
  const secondProg = ((today.getTime() % 1000) / 1000) * 100;
  return secondProg.toFixed(
    elements.numberOfDigits - (elements.numberOfDigits - 1)
  );
};

const updateAll = () => {
  const timeSince = new Date() - elements.lastUpdate;
  const timeSinceInSeconds = timeSince / 1000;
  elements.sinceEL.textContent = timeSinceInSeconds.toFixed(0);
  if (!elements.play) return;
  let date = new Date();
  elements.age.bigNum.textContent = Math.floor(getAge(date));
  elements.age.smallNum.textContent = getAge(date).split(".")[1];
  elements.lifeProg.bigNum.textContent = Math.floor(getLifeProg(date));
  elements.lifeProg.smallNum.textContent = getLifeProg(date).split(".")[1];
  elements.lifeProg.bar.style.width = `${getLifeProg(date)}%`;
  elements.yearProg.bigNum.textContent = Math.floor(getYearProg(date));
  elements.yearProg.smallNum.textContent = getYearProg(date).split(".")[1];
  elements.yearProg.bar.style.width = `${getYearProg(date)}%`;
  elements.monthProg.bigNum.textContent = Math.floor(getMonthProg(date));
  elements.monthProg.smallNum.textContent = getMonthProg(date).split(".")[1];
  elements.monthProg.bar.style.width = `${getMonthProg(date)}%`;
  elements.weekProg.bigNum.textContent = Math.floor(getWeekProg(date));
  elements.weekProg.smallNum.textContent = getWeekProg(date).split(".")[1];
  elements.weekProg.bar.style.width = `${getWeekProg(date)}%`;
  elements.dayProg.bigNum.textContent = Math.floor(getDayProg(date));
  elements.dayProg.smallNum.textContent = getDayProg(date).split(".")[1];
  elements.dayProg.bar.style.width = `${getDayProg(date)}%`;
  elements.hourProg.bigNum.textContent = Math.floor(getHourProg(date));
  elements.hourProg.smallNum.textContent = getHourProg(date).split(".")[1];
  elements.hourProg.bar.style.width = `${getHourProg(date)}%`;
  elements.minuteProg.bigNum.textContent = Math.floor(getMinuteProg(date));
  elements.minuteProg.smallNum.textContent = getMinuteProg(date).split(".")[1];
  elements.minuteProg.bar.style.width = `${getMinuteProg(date)}%`;
  elements.secondProg.bigNum.textContent = Math.floor(getSecondProg(date));
  elements.secondProg.smallNum.textContent = getSecondProg(date).split(".")[1];
  elements.secondProg.bar.style.width = `${getSecondProg(date)}%`;
  elements.lastUpdate = date;
  elements.lastUpdateEl.textContent = date.toLocaleString();
};
getBirthDate();
setInterval(updateAll, elements.refresh);

pause.addEventListener("click", () => {
  if (elements.play) {
    pause.textContent = "Play";
    elements.play = false;
  } else {
    pause.textContent = "Pause";
    elements.play = true;
  }
});
