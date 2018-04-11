function loop(){
  let count = 0
  let move = setInterval(
    function(){
      count -=10
      console.log(count)
      let couloir = document.querySelector('.game__container')
      couloir.style.background = 'url(../images/couloir.png)' + count + 'px center/cover repeat-x'
    },
    20
  )
}
loop()

let randomNumb
let itemsTab = document.querySelectorAll(".items")


function randomItems(){
  randomNumb = Math.floor(Math.random()*3)
  console.log(randomNumb)
  if(randomNumb == 0){
    chaise.classList.remove('none')
    chaise.classList.add('block')
  }
  else if(randomNumb == 1){
    table.classList.remove('none')
    table.classList.add('block')
  }
  else{
    page.classList.remove('none')
    page.classList.add('block')
  }
}


function deplacement(){
  let element = document.querySelector('.block')
  let count = 850
  let move = setInterval(
    function(){
      if(element.classList.contains('block')){
        element = document.querySelector('.block')
        count -= 10
        console.log(count)
        element.style.left = `${count}px`
      }
      if(element.style.left == "0px"){
        element.classList.add('none')
        element.classList.remove('block')
        clearInterval()
        count = 850
      }
    },
    20
  )
}

function happen(){
  let time = setInterval(
    function(){
      randomItems()
      deplacement()
    },
    3000
  )
}

happen()

const player = document.querySelector("#hero")
let hero = {
    name: "",
    health: 3,
    pos: {
        x: 400,
        y: 0
    }
}
const vilain = document.querySelector("#vilain")
let bot = {
    name: "Camille",
    health: 5,
    pos: {
        x: 100,
        y: 0
    }
}
let isGameOver = false

/* Functions */

function moove() {
    if (!isGameOver) {
        hero.pos.x -= 100
        if (hero.pos.x <= 0) {
            gameOver()
        }
        setPlayerPos()
    }
}

function setPlayerPos() {
    player.style.left = `${hero.pos.x}px`
}

function jump(){
    moveUp();
    setTimeout(() => {
        moveDown()
    }, 300)
}

function moveUp() {
    if (!isGameOver) {
        hero.pos.y += 100
        setPlayerHeight()
        console.log(hero.pos.y)
    }
}

function moveDown(){
    if (!isGameOver) {
        setTimeout(() => {
            hero.pos.y -= 100
            setPlayerHeight()
        }, 100)
    }
}

function setPlayerHeight() {
    player.style.bottom = `${hero.pos.y}px`
}

function gameOver() {
    isGameOver = true
}

/* Scolling background */

const game = document.querySelector("#game");
let speed = 0;
let timing = 200;

function scroll() {
    setTimeout(() => {
        speed -= 2
        if (timing >= 10) {
            timing -= 10
        }
        game.style.backgroundPosition = `${speed}px 0`
        if (isGameOver === false) {
            scroll()
        }
        console.log(timing)
    }, timing)
}

scroll()

/* Events */

document.addEventListener(
    "keypress",
    function(e) {
        let keyCode = e.which;
        console.log(e, keyCode, e.which)
        if (keyCode == 32) {
            jump();
        }
    }
)
