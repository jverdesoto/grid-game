const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0

for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if(!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader')
    }
  }
}

draw()

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader')
  }
}

squares[currentShooterIndex].classList.add('shooter')


function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter')
  switch(e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -=1
      break
    case 'ArrowRight' :
      if (currentShooterIndex % width < width -1) currentShooterIndex +=1
      break
  }
  squares[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
  remove()

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width +1
      direction = -1
      goingRight = false
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width -1
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }

  draw()

  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    resultsDisplay.innerHTML = 'GAME OVER'
    clearInterval(invadersId)
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if(alienInvaders[i] > (squares.length)) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML = 'YOU WIN'
    clearInterval(invadersId)
  }
}
invadersId = setInterval(moveInvaders, 600)

function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('laser')

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('boom')

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
      clearInterval(laserId)

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
      aliensRemoved.push(alienRemoved)
      results++
      resultsDisplay.innerHTML = results
      console.log(aliensRemoved)

    }

  }
  switch(e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100)
  }
}

document.addEventListener('keydown', shoot)



//////////////////////////////////////////////////////////////////////////


function init() {
  //* Setting UP the board/grid
  // Create our grid
  const grid = document.querySelector('.grid')
  

  //Grid config
  const width = 20
  const height = 20
  const cellCount = width * height

  let cellsIndex = [] // this is the array where ALL of the cell indexs will be stored for us to access and target in functions because we can't use the data values??????

  // Creating the snake 
  let snake = [167, 168, 169]

  // Create the divs/cells 
  function createBoard () {
      for (let i = 0; i < cellCount; i++) {
          const eachCell = document.createElement('div')
          
          // Adding an index to each div/cell
          eachCell.innerText = i // i.e. each loop, it adds a count of the loop to each cell.
  
          //Add a data index, like the visible index above but functionally usable for the game
          eachCell.dataset.cellId = i
  
          // Now add each of those divs to the grid section using our grid const
          grid.appendChild(eachCell)

          //Add new cell to our cellsIndex arrary 
          cellsIndex.push(eachCell)
      }
  }
  createBoard()
      // * Snake Starting Position
      // Now we put the snake in it's starting position on the board

  function materialiseSnake (snake, cellsIndex) {
      document.querySelectorAll('.grid > div').forEach(a => a.classList.remove('snakeOnBoard')) //clears the classes before moving the snake
      for (let i = 0; i < snake.length; i++){
          cellsIndex[snake[i]].classList.add('snakeOnBoard')
          }
  }
      materialiseSnake(snake, cellsIndex)
  
  // * Snake Movement 
  // These are the events we'll use to move the snake
  document.addEventListener("keydown", snakeMovement)

  let snakeDirection = 1
  
  function keepMovingUp () {
      const event = new KeyboardEvent('keydown', {
          keyCode: 38,
        });
      return event
  }
  // setInterval(snakeMovement, 500)
  
  function snakeMovement (event){
      const UP = 38 // if I wasnt to use asdw then add the values as arrays 
      const DOWN = 40
      const LEFT = 37
      const RIGHT = 39

      const KEY = event.keyCode

      //these two consts are to be able to find the value of the last element, and move the head of the snake according to the KEY press
      const snakesHeadIndex = snake.length-1 
      let snakesHeadValue = snake[snakesHeadIndex]
      

      if (KEY === UP && snakeDirection !== 20 && snakesHeadValue >= width) {
          snakeDirection = -20
        
      } else if (KEY === DOWN && snakeDirection !== -20 && snakesHeadValue + width <= cellCount-1) {
          snakeDirection= 20
            
      } else if (KEY === LEFT && snakeDirection !== 1 && snakesHeadValue % width !== 0) {
          snakeDirection= -1
          
      } else if (KEY === RIGHT&& snakeDirection !== -1 && snakesHeadValue % width !== width - 1) {
          snakeDirection= 1
          
      } else console.log("Don't go back on yourself")

  
  }    

  
  function keepMoving(snakeDirection) {
    if (cellsIndex[snakesHeadValue+snakeDirection].classList.contains('foodOnBoard')) {
      snake.push(snakesHeadValue+snakeDirection)
      removeFood()
      addFood()
  } else {
      snake.push(snakesHeadValue+snakeDirection)
      snake.shift()
  }
  materialiseSnake(snake, cellsIndex)
  }

  setInterval(keepMoving(snakeDirection), 500)


  let randomFoodIndex = null // this assigned in the addFood function, but also by removeFood therefore lives outside of each function

  // * Adding the Food
  function addFood () {
      function getRndInteger(min, max) {
          return Math.floor(Math.random() * (max - min + 1) ) + min;
      }
      randomFoodIndex = getRndInteger(0,cellCount)
      cellsIndex[randomFoodIndex].classList.add('foodOnBoard')
  }
  addFood()

  // * Removing food
  function removeFood () {
      cellsIndex[randomFoodIndex].classList.remove('foodOnBoard')
  }

  // * End Game
  function endGame () {
      alert ('GAME OVER')
  }

// ! END OF THE FILE STUPID !
};

window.addEventListener('DOMContentLoaded', init)