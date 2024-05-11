var result = 0;
var game_started = false;
var timeHeader = document.getElementById('time-header');

function getRandomSize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createSquare() {
    var container = document.getElementById("game");
    var square = document.createElement("div");
    square.id = 'square'
    
    var size = getRandomSize(20, 100); 
    var top = Math.random() * (container.clientHeight - size); 
    var left = Math.random() * (container.clientWidth - size); 
    
    square.style.width = size + "px";
    square.style.height = size + "px";
    square.style.backgroundColor = getRandomColor();
    square.style.position = "absolute";
    square.style.top = top + "px";
    square.style.left = left + "px";

    if(game_started){
        container.appendChild(square);
            square.addEventListener("click", function() {
                container.removeChild(square); 
                createSquare(); 
                result++;
        });
    }
}


function changeTime(){
    var timerDisplay = document.getElementById('time');
    var durationInput = document.getElementById('game-time');
    const duration = parseInt(durationInput.value);
    timeHeader.innerHTML = `Время игры: <span id="time">${duration.toFixed(1)}</span>`
    if (isNaN(duration) || duration <= 0) {
        alert('Пожалуйста, введите корректное время.');
        return;
      }
    timerDisplay.innerText = duration.toFixed(1)
}


function startTimer() {
    result = 0;
    game_started = true
    var durationInput = document.getElementById('game-time');
    var duration = parseInt(durationInput.value);
    var button = document.getElementById('start')
    var game = document.getElementById('game')  
    timeHeader.innerHTML = `Время игры: <span id="time">${duration.toFixed(1)}</span>`
    button.style.display = "none"
    game.style.backgroundColor = 'white'
    var timerDisplay = document.getElementById('time');
    var startTime = Date.now();
    var endTime = startTime + duration * 1000;
    createSquare()
    var timerInterval = setInterval(function() {
      var remainingTime = Math.round((endTime - Date.now()) / 1000);      
      if (remainingTime <= 0) {

        clearInterval(timerInterval);
        timerDisplay.innerHTML = 'Время вышло!';
        game.style.backgroundColor = '#ccc';
        button.style.display = "block";
        square = document.getElementById('square')
        game.removeChild(square)
        console.log(result)
        timeHeader.innerHTML = `Ваш результат: ${result}`
        return;
      }
  
      timerDisplay.innerText = remainingTime;

    }, 1000);

  }
  
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('game-time').addEventListener('change', changeTime)