const buttonsElement = document.querySelector('#stopwatchControls');
const timeFieldElement = document.querySelector('.js-stopwatch-time-field');
const lapsElement = document.querySelector('.js-stopwatch-laps');

let setIntervalId = 0;
let lapStartAccess = false;
let restartAccess = false;
let pauseAccess = false;

let previousTime =
{
seconds: 0,
minutes: 0,
hours: 0
};

let time =
{
seconds: 50,
minutes: 59,
hours: 23
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
  <button class="js-laps-button laps-button">flag img</button>
  <button class="js-pause-button pause-button">pause img</button>
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

  console.log(time);
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
}

function pauseStopwatch()
{
 lapStartAccess = false;
 restartAccess = true;

 clearInterval(setIntervalId); 

 buttonsElement.innerHTML = 
 `
 <button class="js-stop-button stop-button">stop img</button>
 <button class="js-start-button play-button">play img</button>
 `;

 document.querySelector('.js-stop-button').addEventListener('click', restartStopwatch);
 document.querySelector('.js-start-button').addEventListener('click', startStopwatch);
}

function addLap(time)
{ 
  let lapTime = timeSubtraction(time, previousTime);

  let timeString = turnTimeString(time);

  let lapTimeString = turnTimeString(lapTime);

  renderLapsHTML(timeString, lapTimeString); 

}

function restartStopwatch()
{
  lapStartAccess = false;
  pauseAccess = false;

  time.seconds = 0;
  time.minutes = 0;
  time.hours = 0;

  renderClock(time);

  buttonsElement.innerHTML = 
 `
 <button class="js-start-button play-button">play img</button>
 `;

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

  return result;
}

let HTML = '';
let lapNumber = 1;

function renderLapsHTML(time, lapTime)
{
  HTML += `
  <div>${lapNumber}</div>
  <div>${lapTime}</div>
  <div>${time}</div>
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
