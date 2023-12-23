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