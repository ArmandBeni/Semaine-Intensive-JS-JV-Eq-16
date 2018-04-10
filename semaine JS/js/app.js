const player = document.querySelector("#hero")
let hero = {
    name: "",
    health: 3,
    pos: {
        x: 400,
        y: 50
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
        hero.pos.y += 50
        setPlayerHeight()
        console.log(hero.pos.y)
    }
}

function moveDown(){
    if (!isGameOver) {
        setTimeout(() => {
            hero.pos.y -= 50
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
