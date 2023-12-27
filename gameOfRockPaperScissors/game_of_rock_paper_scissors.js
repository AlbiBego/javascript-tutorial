  const score = JSON.parse(localStorage.getItem('score')) ||
  {
    wins: 0,
    losses: 0,
    ties: 0
  };

  const jsResultElement = document.querySelector('.js-result');
  const jsMovesElement = document.querySelector('.js-moves');
  const jsScoreElement = document.querySelector('.js-score');
  jsScoreElement.innerHTML = `<p>Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}</p>`;

  document.querySelector('.js-rock-button').addEventListener('click', () => {playGame('rock');});
  document.querySelector('.js-paper-button').addEventListener('click', () => {playGame('paper');});
  document.querySelector('.js-scissors-button').addEventListener('click', () => {playGame('scissors');});
  document.querySelector('.js-reset-score-button').addEventListener('click', () => {resetScoreQuery();});
  document.querySelector('.js-autoplay-button').addEventListener('click', () => {autoplay();});

  document.body.addEventListener('keyup', event =>
  {
    if(event.key === 'r')
    {
      playGame('rock');
    }
    else if(event.key === 'p')
    {
      playGame('paper');
    }
    else if(event.key === 's')
    {
      playGame('scissors');
    }
    else if(event.key === 'a')
    {
      autoplay();
    }
    else if(event.key === 'Backspace')
    {
      resetScoreQuery();
    }
  });

  let isPlaying = false;
  let setIntervalId;

  function autoplay() 
  {
    const autoplayButtonElement = document.querySelector('.js-autoplay-button');

    if(!isPlaying)
    {
      autoplayButtonElement.innerHTML = `Stop`;

      setIntervalId = setInterval(() => {
        const randomMove = generateRandCompMove();
        playGame(randomMove);
      }, 1000);

      isPlaying = true;
    }
    else
    {
      autoplayButtonElement.innerHTML = 'Auto Play';

      clearInterval(setIntervalId);

      isPlaying = false;
    }
  }

  function playGame(playerMove)
  {
    let result = '';
    const computerMove = generateRandCompMove();

    if(playerMove === 'rock')
    {
      if(computerMove === 'rock')
        result = 'Tie';
      else if(computerMove === 'paper')
        result = 'You lose!';
      else
        result = 'You win!'
    }
    else if(playerMove === 'paper')
    {
      if(computerMove === 'rock')
        result = 'You win!';
      else if(computerMove === 'paper')
        result = 'Tie';
      else
        result = 'You lose!'
    }
    else if(playerMove === 'scissors')
    {
      if(computerMove === 'rock')
        result = 'You lose!';
      else if(computerMove === 'paper')
        result = 'You win!';
      else
        result = 'Tie'
    }

    if(result === 'You win!')
    {
      score.wins++;
    }
    else if(result === 'You lose!')
    {
      score.losses++;
    }
    else if(result === 'Tie')
    {
      score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    jsResultElement.innerHTML = `${result}`;
    jsMovesElement.innerHTML = `You <img class="move-icon" src="rockPaperScissorsGameResources/${playerMove}.png"> - <img class="move-icon" src="rockPaperScissorsGameResources/${computerMove}.png"> Computer `;
    jsScoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }

  function generateRandCompMove()
  {
    let computerMove = '';
    let n = Math.random();

    if(n < 1/3)
      computerMove = 'rock';
    else if(n >= 1/3 && n < 2/3)
      computerMove = 'paper';
    else if(n >= 2/3)
      computerMove = 'scissors';
    else
      alert('Error in generating random computer move !')

      return computerMove;
  }

  function resetScore()
  {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    
    localStorage.removeItem('score');

    jsScoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }

  function resetScoreQuery()
  {
    const resetScoreQueryElement = document.querySelector('.js-reset-score-query');

    resetScoreQueryElement.innerHTML = `
    <div class="js-reset-score-query">
      <p class="js-reset-score-query-paragraph">Are you sure you want to reset the score?</p>
      <button class="js-yes-button reset-score-button">Yes</button>
      <button class="js-no-button reset-score-button">No</button>
    </div>`;

    document.querySelector('.js-yes-button').addEventListener('click', () =>
    {
      resetScore();
      resetScoreQueryElement.innerHTML = `
      <p class="js-reset-score-query-paragraph"></p>
      <button class="js-reset-score-button reset-score-button">Reset score</button>
      `;

      document.querySelector('.js-reset-score-button').addEventListener('click', () => {resetScoreQuery();});
    });
    document.querySelector('.js-no-button').addEventListener('click', () =>
    {
      resetScoreQueryElement.innerHTML = `
      <p class="js-reset-score-query-paragraph"></p>
      <button class="js-reset-score-button reset-score-button">Reset score</button>
      `;

      document.querySelector('.js-reset-score-button').addEventListener('click', () => {resetScoreQuery();});
    });
  }

  
  
  
