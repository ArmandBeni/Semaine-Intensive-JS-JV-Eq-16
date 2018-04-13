const player = document.querySelector("#hero")//div hero html

let hero = { //objet hero
    name: "",
    health: 2,
    pos: {
        x: 400,
        y: 50
    }
}
const vilain = document.querySelector("#vilain")//div vilain html
let bot = { //objet vilain
    name: "Camille",
    health: 5,
    pos: {
        x: 100,
        y: 0
    }
}
let isJumping = false
var isGameOver = false

/* Mouvements */

//recule le personnage d'un cran égal à 100px, si la position est égale à 0, fin du jeu
function move() {
    if (!isGameOver) {
        hero.pos.x -= 100
        if (hero.pos.x < 0) {
            gameOver()
        }
        setPlayerPos()
    }
}

//modifie la position sur l'abcisse de l'objet hero
function setPlayerPos() {
    player.style.left = `${hero.pos.x}px`
}

//fait sauter le personnage en appelant les fonctions moveUp et moveDown avec un délais pour la fluidité,
function jump(){
    if (isJumping === false) {
        moveUp();
        jumping();
        setTimeout(() => {
            moveDown()
        }, 300)
    }
    setTimeout(() => {
        isJumping = false
    }, 650)
}

let jumpHeight = 200// définit la hauteur du saut en px
//déplace le hero vers le haut
function moveUp() {
    if (!isGameOver) {
        hero.pos.y += jumpHeight
        setPlayerHeight()
    }
}

//déplace le hero vers le bas
function moveDown(){
    if (!isGameOver) {
        setTimeout(() => {
            hero.pos.y -= jumpHeight
            setPlayerHeight()
        }, 100)
    }
}

//modifie le placement sur les ordoonées du personnage
function setPlayerHeight() {
    player.style.bottom = `${hero.pos.y}px`
}

/* Colisions */

function isCollide(b) {
    if (parseInt(b.style.left) > parseInt(player.offsetLeft)
    && parseInt(b.style.left) < parseInt(player.offsetLeft) + parseInt(player.offsetWidth)
    && b.offsetTop > player.offsetTop
    && b.offsetTop < (player.offsetTop + player.offsetHeight)) {
        removeObject(b)
        return true
    } else {
        return false
    }
}

function checkCollide(element){
    if (isCollide(element) === true) {
        takeDamage()
        collisionSound.play()
    }
}

/* Damages */

let tabHearts = document.querySelectorAll(".heart")

//retire un point de health et active la fonction move() puis affiche la valeur de health
function takeDamage(){
    if (hero.health >= 0) {
        move()
        removeHeart()
        hero.health -= 1;
        return hero.health;
    }else {
        gameOver()
    }
}

function removeHeart(){
    document.getElementById(`heart${hero.health}`).style.visibility = "hidden"
    damageSound.play()
}

function recoverHearts(){
    document.getElementById(`heart${hero.health}`).style.visibility = "visible"
}

//met fin au jeu en modifiant la variable isGameOver en true
function gameOver() {
    isGameOver = true
    gameSound.pause()
    looseSound.play()
}

//déclenche le saut
function jumping(){
    isJumping = true
    jumpSound.play()
}

/* Scolling background */

//TODO: accelerer la vitesse de rotation à chaque tour d'hetic =) !

const game = document.querySelector("#game")
var speed = 0
let timing = 200

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
    }, timing)
}

/* Controller */

let spacebarID = 32

//Lorsque la touche espace est enfoncée, le personnage saute
document.addEventListener(
    "keydown",
    function(e) {
        let keyCode = e.which
        if (keyCode == spacebarID && isJumping == false) {
            jump()
            isJumping = true
        }
    }
)
//empecher de scroll la page quand spacebar est enfoncée
document.addEventListener('keydown', function (e) {
    if ( ( e.keycode || e.which ) == spacebarID) {
        e.preventDefault();
    }
}, false);

//bloquer le scroll horizontal
function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
}

/* Player animation */

function animate() {
    let pos = 0
    let int = setInterval(() => {
        if (!isGameOver) {
            if (pos < 7) {
                pos++
            }else {
                pos = 0
            }
            //Concaténation dans l'url en fonction du choix du skin
            player.style.backgroundImage = `url("../images/run/${hero.name}/silhouette${hero.name}${pos}.png")`
        }
        else if (isJumping === true) {
            player.style.backgroundImage = `url("../images/jump/${hero.name}/silhouette${hero.name}4.png")`
        }
        else {
            clearInterval(int)
        }
    }, 200)
}

//TODO: Optimiser pour éviter le copié collé de fontion
function animateVilain() {
    let pos = 0
    let int = setInterval(() => {
        if (!isGameOver) {
            if (pos < 7) {
                pos++
            }else {
                pos = 0
            }
            //Concaténation dans l'url en fonction du choix du skin
            vilain.style.backgroundImage = `url("../images/run/${bot.name}/silhouette${bot.name}${pos}.png")`
        }
        else {
            clearInterval(int)
        }
    }, 200)
}

function run(){
    setInterval(() => {
        animate()
        animateObject()
    }, 300)
}

/* Obstacles */

let obstacle = {
    objectNumber: 0, // numero de l'objet
    objectList: [], // tableaux contenant tes objets
    pos: {
        x: 0,
        y: 0
    }
}

function createObject() { // Créer un objet dans le DOM
    const newEl = document.createElement("div") // creation de ma div
    newEl.setAttribute('id', `object_${obstacle.objectNumber}`) // assignation de l'attribut id en fonction de objectNumber
    const randElement = Math.floor(Math.random() * 3)
    switch (randElement) {
        case 0:
            newEl.classList.add("poubelle")
            break;
        case 1:
            newEl.classList.add("table")
            break;
        case 2:
            newEl.classList.add("papier")
            break;
        default:
            break;
    }
    newEl.style.left = window.innerWidth + 'px'
    game.appendChild(newEl) // place ma nouvelle div dans game
    const newElDOM = document.querySelector(`#object_${obstacle.objectNumber}`) // chercher le nouvel element sur le DOM
    obstacle.objectList.push(newElDOM)// ajout de l'objet au tableau
    obstacle.objectNumber ++ // incrémentation de objectNumber pour ajouter un nouvel obstacle
}

function removeObject(element) { // Supprimer l'object dans le DOM
    const index = obstacle.objectList.indexOf(element)
    if (index !== -1) {
        if (parseInt(element.style.left) < 0) {
            obstacle.objectList.slice(index, 1)
            if (document.querySelector('#'+element.id)) {
                game.removeChild(element)
            }
        }
    }
}

function animateObject() {
    // fait bouger l'objet dans la div de droite à gauche, et appelle la fonction remove quand l'objet sort de l'écran
    if (obstacle.objectList.length > 0) {
        for (var i = 0; i < obstacle.objectList.length; i++) {
            if (parseInt(obstacle.objectList[i].style.left) <= 0) {
                removeObject(obstacle.objectList[i])
            } else {
                let newPos = parseInt(obstacle.objectList[i].style.left)
                newPos -= 130
                obstacle.pos.y =  newPos
                obstacle.objectList[i].style.left = obstacle.pos.y + 'px'
                checkCollide(obstacle.objectList[i])
            }
        }
    }
}

/* Choix du perso */

let isHeroSelected = false
let selectionHeroDiv = document.querySelectorAll(".game__characterList > div")
let attribute = ""

//Evènement de la selection du personnage par click sur la div

for (let j = 0; j < selectionHeroDiv.length; j++) {
    selectionHeroDiv[j].addEventListener("click", function(){
        if (isHeroSelected === false){
            attribute = this.className
            isHeroSelected = true
            setAttribute()
            init()
        }
    })
}

function setAttribute() {
    if (isHeroSelected === true) {
        hero.name = attribute
    }
}

/* Score */
let metre = 0

function loopScore(){
    setTimeout(() => {
        const score = document.querySelector(".score")
        metre += 1
        score.innerHTML = metre
        if (!isGameOver){
            loopScore()
        }
    }, 200)
}

/* Sounds */

let menuSound = document.querySelector(".menuSound")
let gameSound = document.querySelector(".gameSound")
let jumpSound = document.querySelector(".jumpSound")
let damageSound = document.querySelector(".damageSound")
let collisionSound = document.querySelector(".collisionSound")
let looseSound = document.querySelector(".looseSound")

/* INIT GAME */

let randomTime = 0
menuSound.play()
function init() {
    metre = 0
    unloadScrollBars()
    if (isHeroSelected === true && !isGameOver) {
        menuSound.pause()
        gameSound.play()
        scroll()
        loopScore()
        setTimeout(() => {
            run()
            animateVilain()
        }, 300)
        randomSpawn()
    }
}

function randomSpawn() {
    //Distance de spawn aléatoire entre 2 obstacles
    let spawnTime = Math.floor(Math.random()*(9000 - 7000) + 7000)
    setTimeout(() => {
        if (!isGameOver) {
            createObject()
            randomSpawn()
        }
    }, spawnTime)
}

//redemarre la partie
function restart(){
    isGameOver = false
    hero.health = 2
    recoverHearts()
    hero.pos.x = 400
    init()
}

document.querySelector("#restartBtn").addEventListener(
    "click", () => {
        restart()
    })
