(() => {

	let app = document.querySelector("#app");
	let resetBtn = document.querySelector("#resetBtn");
  let score = document.querySelector("#score");
  let highScore = document.querySelector("#highScore");

	let store = window.localStorage;
	const GRID_SIZE = 3;
	const CELL_SIZE = 100;
  const TIME = 1000;
  let interval;

  //this will be an object which encapsulates everything
	let Game = () => {};

	//Initial items in list
	Game.items = [];
  Game.score = 0;

	Game.resetGame = () => {
		Game.score = 0;
    app.innerHTML = '';
		Game.init();
	};

  Game.updateScore = (op) => {
    if(op === 'grey'){
      Game.score = Game.score - 1;
    } else {
      Game.score = Game.score + 1;
    }
    score.innerHTML = Game.score;
    Game.saveScore();
  }

  Game.start = (op) => {
    let random = Math.floor(Math.random() * GRID_SIZE * GRID_SIZE);
    let colored = document.querySelector("[data-value='green']");
    if(colored){
      colored.setAttribute("data-value", "grey");
      colored.className = "cell";
    }
    let cell = document.querySelectorAll(".cell")[random];
    cell.setAttribute("data-value", "green");
    cell.className += " green";
  }

	// render the list on UI
	Game.render = () => {
    let container = document.createElement('ul');
    container.style.width = `${CELL_SIZE*GRID_SIZE + 6}px`;
		let cells = [];
		for(let i = 0; i < GRID_SIZE * GRID_SIZE; i++){
			cells.push(`<li class=cell data-value="grey" style="width:${CELL_SIZE}px;height:${CELL_SIZE}px"></li>`);
		}
		container.innerHTML = cells.join("");
		app.append(container);
    highScore.innerHTML = Game.getHighScore();
	};

	Game.saveScore = () => {
    if(Game.score > store.getItem('highscore')){
		    store.setItem('highscore', JSON.stringify(Game.score));
        highScore.innerHTML = Game.score;
    }
	};

  Game.getHighScore = () => {
    return store.getItem('highscore');
  };


	// initialise the game
	Game.init = () => {
    highScore.innerHTML = Game.getHighScore();
    score.innerHTML = Game.score;
		Game.render();
    clearInterval(interval);
    interval = setInterval(Game.start, TIME);
	};

	Game.init();

	////////////////// Event Handlers /////////////////////

	resetBtn.addEventListener("click", function(){
    Game.resetGame();
    Game.start();
  });

	// Using event delegation for dynamically generated items
	app.addEventListener("click", (event) => {
		if(event.target.className.indexOf('cell') > -1){
      let cellType = event.target.getAttribute('data-value');
			Game.updateScore(cellType);
		}
  });

})();
