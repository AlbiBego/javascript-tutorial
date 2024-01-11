const buttonsElement = document.querySelector('#stopwatchButtons');
const timeFieldElement = document.querySelector('.js-stopwatch-time-field');
const lapsElement = document.querySelector('.js-stopwatch-laps');
const stopwatchContentElement = document.querySelector('#stopwatchContent');

let setIntervalId = 0;
let lapStartAccess = false;
let restartAccess = false;
let pauseAccess = false;

let previousTime = JSON.parse(localStorage.getItem('previous-time')) ||
{
seconds: 0,
minutes: 0,
hours: 0
};

let time = JSON.parse(localStorage.getItem('time')) ||
{
seconds: 0,
minutes: 0,
hours: 0
};

renderClock(time);

document.querySelector('.js-start-button').addEventListener('click', startStopwatch);
document.body.addEventListener('keyup', event => keyHandling(event));
if(lapsElement.classList.contains('stopwatch-laps-rendered'))
{
  document.body.addEventListener('keyup', event => keyHandling(event));
}

function keyHandling(event)
{
  if(event.key === 'Enter')
  {
    clearInterval(setIntervalId);
    startStopwatch();
  }
  else if(event.key === 'p')
  {
    if(pauseAccess)
    {
      pauseStopwatch();
    }
  }
  else if(event.key === 's')
  {
    if(restartAccess)
    {
      restartStopwatch();
    }
  }
  else if(event.key === 'f')
  {
    if(lapStartAccess)
    {
      addLap(time);
    }
  }
}

function startStopwatch()
{
  lapStartAccess = true;
  pauseAccess = true;
  restartAccess = false;

  setIntervalId = setInterval(() => {
    updateClock();
  }, 1000);

  buttonsElement.innerHTML = 
  `
  <button class="js-laps-button laps-button">
    <img class="lap-button" src="project resources/lap-icon.png">
  </button>

  <button class="js-pause-button pause-button">
    <img class="pause-button" src="project resources/pause-icon.png">
  </button>
  `;

  document.querySelector('.js-laps-button').addEventListener('click', () => addLap(time));
  document.querySelector('.js-pause-button').addEventListener('click', pauseStopwatch);
}

function updateClock()
{
  time.seconds++;

  if(time.seconds > 59)
  {
    time.seconds = 0;
    time.minutes++;
  }
  
  if(time.minutes > 59)
  {
    time.minutes = 0;
    time.hours++;
  }

  if(time.hours > 23)
  {
    time.hours = 0;
  }

  renderClock(time);
}

function renderClock(time)
{
  timeFieldElement.innerHTML = '';

  if(time.hours < 10)
  {
    timeFieldElement.innerHTML = '0' + time.hours + ':';
  }
  else
  {
    timeFieldElement.innerHTML = '' + time.hours + ':'; 
  }

  if(time.minutes < 10)
  {
    timeFieldElement.innerHTML += '0' + time.minutes + ':';
  }
  else
  {
    timeFieldElement.innerHTML += '' + time.minutes + ':'; 
  }

  if(time.seconds < 10)
  {
    timeFieldElement.innerHTML += '0' + time.seconds;
  }
  else
  {
    timeFieldElement.innerHTML += '' + time.seconds; 
  }

  localStorage.setItem('time', JSON.stringify(time))
}

function pauseStopwatch()
{
 lapStartAccess = false;
 restartAccess = true;

 clearInterval(setIntervalId); 

 buttonsElement.innerHTML = 
 `
 <button class="js-stop-button stop-button">
  <img src="project resources/stop-icon.png">
 </button>

 <button class="js-start-button play-button">
  <img class="play-button" src="project resources/play-icon.png">
 </button>
 `;

 document.querySelector('.js-stop-button').addEventListener('click', restartStopwatch);
 document.querySelector('.js-start-button').addEventListener('click', startStopwatch);
}

function addLap(time)
{ 
  stopwatchContentElement.style.justifyContent = 'flex-start';
  timeFieldElement.style.marginBottom = '20px';  
  timeFieldElement.style.fontSize = '30px';  

  let lapTime = timeSubtraction(time, previousTime);

  let timeString = turnTimeString(time);

  let lapTimeString = turnTimeString(lapTime);

  renderLapsHTML(timeString, lapTimeString);
}

function restartStopwatch()
{
  timeFieldElement.style.fontSize = '40px';

  lapNumber = 1;
  HTML = '';
  lapStartAccess = false;
  pauseAccess = false;

  time.seconds = 0;
  time.minutes = 0;
  time.hours = 0;

  previousTime.seconds = 0;
  previousTime.minutes = 0;
  previousTime.hours = 0;

  localStorage.setItem('time', JSON.stringify(time))
  localStorage.setItem('previous-time', JSON.stringify(previousTime));

  renderClock(time);

  buttonsElement.innerHTML = 
 `
 <button class="js-start-button play-button">
  <img class="play-button" src="project resources/play-icon.png">
 </button>
 `;

 lapsElement.innerHTML = '';

 stopwatchContentElement.style.justifyContent = 'center';
 timeFieldElement.style.marginBottom = '60px';

 document.querySelector('.js-start-button').addEventListener('click', startStopwatch);
}

function timeSubtraction(time, previousTime)
{
  let result = JSON.parse(JSON.stringify(time));

  if(previousTime.seconds > result.seconds)
  {
    result.minutes--;
    result.seconds = (result.seconds + 60) - previousTime.seconds;
  }
  else
  {
    result.seconds = result.seconds - previousTime.seconds;
  }
  
  if(previousTime.minutes > result.minutes)
  {
    result.hours--;
    result.minutes = (result.minutes + 60) - previousTime.minutes;
  }
  else
  {
    result.minutes = result.minutes - previousTime.minutes;
  }

  if(previousTime.hours > result.hours)
  {
    result.hours = (result.hours + 24) - previousTime.hours; // or just 0
  }
  else
  {
    result.hours = result.hours - previousTime.hours;
  }

  //previousTime = JSON.parse(JSON.stringify(time)); this is a mistake
  previousTime.seconds = time.seconds;
  previousTime.minutes = time.minutes;
  previousTime.hours = time.hours;

  localStorage.setItem('previous-time', JSON.stringify(previousTime));

  return result;
}

let HTML = '';
let lapNumber = 1;

function renderLapsHTML(time, lapTime)
{
  HTML += `
  <div class="lap-number">${lapNumber}</div>
  <div class="lap-time">${lapTime}</div>
  <div class="lap-finish-time">${time}</div>
  `;

  lapsElement.classList.add('stopwatch-laps-rendered');
  lapNumber++;

  lapsElement.innerHTML = HTML;
}

function turnTimeString(time)
{
  let temp = '';

  if(time.hours < 10)
  {
    temp = '0' + time.hours + ':';
  }
  else
  {
    temp = '' + time.hours + ':'; 
  }

  if(time.minutes < 10)
  {
    temp += '0' + time.minutes + ':';
  }
  else
  {
    temp += '' + time.minutes + ':'; 
  }

  if(time.seconds < 10)
  {
    temp += '0' + time.seconds;
  }
  else
  {
    temp += '' + time.seconds; 
  }

  return temp;
} 
