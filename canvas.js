const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');
const cubeWidth = 9;
const cubeHeight = 9;
const message = document.getElementById('messageP');
const recordButton = document.getElementById('recordButton');
const recordBack = document.getElementById('recordBack');
const recordReset = document.getElementById('recordReset');
const rangeLevel = document.getElementById('range');
const levelButton = document.getElementById('levelButton');
const lableLevel = document.getElementById('wicheLevel');
const backgroundAudio = document.getElementById('audio');
const eatAudio = document.getElementById('eatAudio');
const endAudio = document.getElementById('endAudio');
const appleImage = new Image();
const snakeHead = new Image();
const machzor = document.getElementById('machzor');
const nv = document.getElementById('nv');
const bCheating = document.getElementById('cheating');
const cheat = document.getElementsByClassName('CHEATING');
const speedC = document.getElementById('speedC');
const bigC = document.getElementById('bigC');
const loseC = document.getElementById('loseC');
const messageDiv = document.getElementById('messageDiv');
const barp = document.getElementById('barp');
let score = 0;
let barpScore = false;
let copyScore = 0;
let plusScore = 0;
let hiLevel = 0;
let records = []
let snakeMove = [];
let direction = '';
let rightMove = 0;
let downMove = 0;
let appleRight = 0;
let appleDown = 0;
let speed = 50;
let level = 1;
let moveOn = false;
let enter = true;
let oneMove = 0;
let prolonging = 99999;
let endMessage = 0;
let snakeColor = {color : 'red', num : 1};
let copySpeed = 100;
let canLose = true;
let canCheating = true;
let canScore = true;
let lestBastScore = [];






// localStorage.removeItem('bastScore');
// localStorage.removeItem('score');
for (let i = 0; i < 5; i++) {
    lestBastScore.push(localStorage.getItem(`bastScore${i}`));
}
message.innerHTML = 'press space to start';
appleImage.src = "https://html5.gamedistribution.com/rvvASMiM/40caa9898a864a95a5bbbf4b7d0a8484/images/apple.png";
snakeHead.src = "https://art.pixilart.com/bf702463aa6296c.png";

/*let img = new Image();
img.src = "https://png.pngtree.com/element_our/png/20181227/apple-vector-icon-png_293587.jpg"
img.style.height = '10%';
img.style.width = '10%';

img.onload = function(){
    ctx.drawImage(img, 0, 0);
}

canvas.addEventListener('click', (event) => {
    ctx.fillStyle = 'red'; // (255, 0, 0, 255)
    ctx.fillRect(90, 90, 1, 1);

    pixelData = ctx.getImageData(90, 90, 1, 1);
    let DD = pixelData.data;
    let Data = `rgba(${DD[0]}, ${DD[1]}, ${DD[2]}, ${DD[3]})`;
    alert(Data);


    if (nv.value === 'נו') {
            canLose = false;
        } else {
            canLose = true;
        }
})*/


start();
function start () {
    record();
    bCheating.addEventListener('click', (event) => {
        enter = false
        nv.style.display = 'flex';
        machzor.style.display = 'flex';
        bCheating.style.display = 'none';
        recordButton.style.display = 'none';
    })
    levelButton.addEventListener('click', (event) => {
        if (nv.value === 'שהם מלכים') {
            message.style.display = 'none';
            enter = true;
            Cheating();
        } else {
            enter = true;
            backgroundAudio.volume = 0.2;
            backgroundAudio.play();
            speed = 150 - rangeLevel.value;
            copySpeed = speed;
            if (rangeLevel.value < 25) {
                hiLevel = 0;
            } else if (rangeLevel.value <= 50) {
                hiLevel = 1;
            } else if (rangeLevel.value < 75) {
                hiLevel = 3;
            } else if (rangeLevel.value <= 100) {
                hiLevel = 5;
            }
            rangeLevel.style.display = 'none';
            levelButton.style.display = 'none';
            lableLevel.style.display = 'none';
            message.style.display = 'flex';
            recordButton.style.display = 'none';
            machzor.style.display = 'none';
            nv.style.display = 'none';
            bCheating.style.display = 'none';
            if (nv.value !== 'שהם מלכים') {
                callFunc();
            }
        }
    })
}


function callFunc () {
    //if (nv.value !== 'שהם מלכים') {
        for (let oneCheat of cheat) {
            oneCheat.style.display = 'none';
        }
        backgroundAudio.volume = 0.2;
        message.style.display = 'flex';
        window.addEventListener('keydown', (event) => {
            if (event.keyCode === 32 && enter === true) {
                enter = false;
                backgroundAudio.play();
                message.innerHTML = 'press the arrows to move';
                ctx.fillRect(rightMove, downMove, cubeWidth, cubeHeight);
                moveOn = true;
                nv.value = '';
                rangeLevel.style.display = 'none';
                levelButton.style.display = 'none';
                lableLevel.style.display = 'none';
                message.style.display = 'flex';
                recordButton.style.display = 'none';
                machzor.style.display = 'none';
                nv.style.display = 'none';
                bCheating.style.display = 'none';
                randomApple();
                ctxGo();
            }
        })
    //}
}

function record () {
    recordButton.addEventListener('click', (event) => {
        levelButton.style.display = 'none';
        bCheating.style.display = 'none';
        rangeLevel.style.display = 'none';
        lableLevel.style.display = 'none';
        recordButton.style.display = 'none';
        recordBack.style.display = 'flex';
        message.style.display = 'flex';
        recordReset.style.display = 'flex';
        recordReset.addEventListener('click', (event) => {
            resetScore();
        })
        recordBack.addEventListener('click', (event) => {
            levelButton.style.display = 'flex';
            bCheating.style.display = 'flex';
            rangeLevel.style.display = 'flex';
            lableLevel.style.display = 'flex';
            recordButton.style.display = 'flex';
            recordBack.style.display = 'none';
            message.style.display = 'none';
            recordReset.style.display = 'none';
            message.innerHTML = 'press space to start';
        })
        message.innerHTML = lestBastScore;
    })
}



function resetScore() {
    lestBastScore = [];
    for (let i = 0; i < 5; i++) {
        localStorage.setItem(`bastScore${i}`, 0);
    }
    for (let i = 0; i < 5; i++) {
        lestBastScore.push(localStorage.getItem(`bastScore${i}`));
    }
}


function Cheating () {
    canScore = false;
    nv.style.display = 'none';
    machzor.style.display = 'none';
    rangeLevel.style.display = 'none';
    lableLevel.style.display = 'none';
    levelButton.style.display = 'grid';
    message.style.display = 'none';
    enter = true;
    for (let oneCheat of cheat) {
        oneCheat.style.display = 'flex';
    }
    canCheating = true;
    if (canCheating === true) {
        canCheating = false;
        levelButton.addEventListener('click', (event) => {
            speed = 1000 - (speedC.value);
            hiLevel = bigC.value;
            if (loseC.value === 'yes') {
                canLose = true;
            } else {
                canLose = false;
            }
            for (let oneCheat of cheat) {
                oneCheat.style.display = 'none';
            }
            levelButton.style.display = 'none';
            message.style.display = 'flex';
            callFunc();
        })
    }
}





/*function startPlay () {
    window.addEventListener('keydown', (event) => {
        if (event.keyCode === 32 && enter === true) {
            enter = false;
            message.innerHTML = 'press the arrows to move';
            ctx.fillRect(rightMove, downMove, cubeWidth, cubeHeight);
            moveOn = true;
            randomApple();
            ctxGo();
        }
    })
}*/


function ctxGo () {
    window.addEventListener('keydown', (event) => {
        switch(event.keyCode) {
            case 37:
                if (direction !== 'right') {
                    direction = 'left';
                }
                break;
            case 39:
                if (direction !== 'left') {
                    direction = 'right';
                }
                break;
            case 38:
                if (direction !== 'down') {
                    direction = 'up';
                }
                break;
            case 40:
                if (direction !== 'up') {
                    direction = 'down';
                }
                break;
        }
    })
    ctxMove(direction);
}

function ctxMove (direction) {
    switch(direction) {
        case 'left':
            rightMove -= cubeWidth + 1;
            if (rightMove < 0) {
                rightMove = canvas.width - cubeWidth - 1;
            }
            break;
        case 'right':
            rightMove += cubeWidth + 1;
            if (rightMove > canvas.width - 1) {
                rightMove = 0;
            }
            break;
        case 'up':
            downMove -= cubeHeight + 1;
            if (downMove < 0) {
                downMove = canvas.height - cubeHeight - 1;
            }
            break;
        case 'down':
            downMove += cubeHeight + 1;
            if (downMove > canvas.height - 1) {
                downMove = 0;
            }
            break;
    }
    if (moveOn === true) {
        for (let i = 0; i < snakeMove.length - 1; i++) {
            oneMove = snakeMove[i];
            if (oneMove.right === rightMove && oneMove.down === downMove && canLose === true) { 
                moveOn = false;
                message.innerHTML = `game over! | score: ${score}`;
                endMessage = setTimeout(() => {
                    message.innerHTML = `press enter to refresh`;
                }, 5000);
                records.push(score);
                records.sort((a, b) => a - b);
                endAudio.volume = 0.5;
                endAudio.play();
                updateScore();
                endGame();
                break;
            }
        } 
    }
    if (moveOn === true) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //if (!(appleDown - downMove <= cubeHeight && appleDown - downMove >= -cubeHeight) || !(appleRight - rightMove <= cubeWidth && appleRight - rightMove >= -cubeWidth)) {
        if (downMove !== appleDown || rightMove !== appleRight) { 
            ctx.drawImage(appleImage,appleRight, appleDown, cubeWidth, cubeHeight);
            backgroundAudio.play();
            if (prolonging > hiLevel) {
                snakeMove.shift();
            }
        } else {
            let EAudio = Math.floor(Math.random() * 7);
            if (EAudio === 1) {
                barp.play();
                barpScore = true;
            } else {
                eatAudio.play();
            }
            prolonging = 0;
            Score();
            randomApple();
            message.innerHTML = `apple: ${level} | score: ${score} | +${plusScore}`;
            level += 1;
            speed -= 1;
        }
        snakeColor.num++;
        if (snakeColor.num > 5){
            snakeColor.num = 1;
        }
        snakeMove.push({
            right : rightMove,
            down : downMove,
            color : snakeColor.num,
        })
        drawSnake(snakeMove);
        setTimeout(ctxGo, speed);
        prolonging++;
    }
}


function drawSnake (snakeMove) {
    for (oneMove of snakeMove) {
        if (oneMove === snakeMove[snakeMove.length - 1]) {;
            ctx.drawImage(snakeHead, oneMove.right, oneMove.down, cubeWidth, cubeHeight);
        } else {
            switch(oneMove.color) {
                case 1:
                    snakeColor.color = 'orange';
                    break;
                case 2:
                    snakeColor.color = 'yellow';
                    break;
                case 3:
                    snakeColor.color = 'yellowgreen';
                    break;
                case 4:
                    snakeColor.color = 'green';
                    break;
                case 5:
                    snakeColor.color = 'red';
                    break;
            }
            ctx.fillStyle = snakeColor.color;
            ctx.fillRect(oneMove.right, oneMove.down, cubeWidth, cubeHeight);
        }
    }
}


function randomApple () {
    appleDown = Math.random() * canvas.height;
    appleDown = Math.round(appleDown);
    appleRight = Math.random() * canvas.width;
    appleRight = Math.round(appleRight);
    appleRight = appleRight - (appleRight % (cubeWidth + 1));
    appleDown = appleDown - (appleDown % (cubeHeight + 1));
    if (appleDown < cubeHeight + 1 || appleDown > canvas.height - cubeHeight - 1 || appleRight < cubeWidth + 1 || appleRight > canvas.width - cubeWidth - 1) { // || appleDown % 2 !== 0 || appleRight % 2 !== 0) {
        randomApple();
    } else {
        ctx.drawImage(appleImage,appleRight, appleDown, cubeWidth, cubeHeight);
    }
}


function Score () {
    if (canScore) {
        copyScore = score;
        let speedScore = 100 - speed
        if (speedScore > 100) {
            speedScore = 100;
        }
        if (speedScore < 0) {
            speedScore = 0;
        }
        speedScore *= 2;
        if (barpScore) {
            score += 50;
            barpScore = false;
        }
        score += speedScore;
        score += hiLevel * 15;
        score += level * (hiLevel + 1);
        score = Math.floor(score);
        plusScore = score - copyScore;
    } else {
        score = 0;
        plusScore = 0;
    }
}



function updateScore () {
    for (let i = 0; i < 5; i++) {
        lestBastScore[i] = parseInt(lestBastScore[i]);
    }
    lestBastScore.sort((a, b) => a - b);
    if (lestBastScore.length < 5) {
        lestBastScore.push(score);
        lestBastScore.sort((a, b) => a - b);
    } else if (score > lestBastScore[0]) {
        lestBastScore.shift();
        lestBastScore.unshift(score);
        lestBastScore.sort((a, b) => a - b);
    }
    for (let i = 0; i < 5; i++) {
        localStorage.setItem(`bastScore${i}`, lestBastScore[i]);
    }
}


function endGame () {
    let enterKey = true;
    window.addEventListener('keydown', (event) => {
        if (event.keyCode === 13 && enterKey === true) {
            enterKey = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            clearTimeout(endMessage);
            snakeMove = [];
            downMove = 0;
            direction = '';
            appleRight = 0;
            rightMove = 0;
            appleDown = 0;
            moveOn = true;
            level = 1;
            canScore = true;
            oneMove = 0;
            score = 0;
            enter = true;
            barpScore = false;
            speed = copySpeed;
            canLose = true;
            snakeColor = {color : 'red', num : 1};
            message.innerHTML = 'press space to start';
            prolonging = 99999;
            rangeLevel.style.display = 'flex';
            levelButton.style.display = 'grid';
            lableLevel.style.display = 'flex';
            message.style.display = 'none';
            recordButton.style.display = 'flex';
            bCheating.style.display = 'flex';
            start();
        }
    })
}




