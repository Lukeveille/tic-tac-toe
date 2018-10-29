document.addEventListener('DOMContentLoaded', () => {
  console.log('My DOM is ready');

  var gameSquare = document.querySelectorAll('.gameSquare'),
  turnHeader = document.querySelector('h1');
  turn = true;
  
  gameSquare.forEach(function(element) {
    element.addEventListener('click', gameSquareClicked);
  });
  
  // .addEventListener('click', gameSquareClicked);

  function gameSquareClicked() {
    if (turn) {
      this.innerHTML = 'X';
      turnHeader.innerHTML = 'Player 2 Turn';
      turn = false;
    } else {
      this.innerHTML = 'O';
      turn = true;
      turnHeader.innerHTML = 'Player 1 Turn';
    }
  }
});