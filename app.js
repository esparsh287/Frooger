document.addEventListener('DOMContentLoaded', ()=>{

const timeLeft=document.querySelector("#time-left")
const result=document.querySelector('#result')
const startPauseButton=document.querySelector('#start-pause-button')
const sqaures=document.querySelectorAll('.grid div')
let currentIndex=76;
const width=9;
const logsLeft=document.querySelectorAll('.log-left')
const logsRight=document.querySelectorAll('.log-right')
const carsLeft=document.querySelectorAll('.car-left')
const carsRight=document.querySelectorAll('.car-right')
let timerId
let currentTime=60
let outcomeImerId


function moveFrog(e){
  sqaures[currentIndex].classList.remove('frog')
  
  switch(e.key){
    case 'ArrowLeft':
      if(currentIndex%width!==0)  currentIndex--;
      break
    case 'ArrowRight':
      if(currentIndex%width < width-1) currentIndex++;
      break
    case 'ArrowUp':
      if(currentIndex-width>=0) currentIndex-=width;
      break
    case 'ArrowDown':
      if(currentIndex+width < width*width)currentIndex+=width;
      break
  }
  
  sqaures[currentIndex].classList.add('frog')
}



function autoMoveElements(){
  currentTime--
  timeLeft.textContent=currentTime
  logsLeft.forEach(logLeft=>moveLogLeft(logLeft))
  logsRight.forEach(logRight=>{moveLogRight(logRight)})
  carsLeft.forEach(carLeft=>moveCarLeft(carLeft))
  carsRight.forEach(carRight=>moveCarRight(carRight))
 
}

function checkOutcome(){
  lose()
  win()
}


function moveLogLeft(logLeft){
  switch(true){
    case logLeft.classList.contains('l1'):
      logLeft.classList.remove('l1')
      logLeft.classList.add('l2')
      break

      case logLeft.classList.contains('l2'):
        logLeft.classList.remove('l2')
        logLeft.classList.add('l3')
        break

      case logLeft.classList.contains('l3'):
        logLeft.classList.remove('l3')
        logLeft.classList.add('l4')
        break
      case logLeft.classList.contains('l4'):
        logLeft.classList.remove('l4')
        logLeft.classList.add('l5')
        break
      case logLeft.classList.contains('l5'):
        logLeft.classList.remove('l5')
        logLeft.classList.add('l1')
        break
  }
}

function moveLogRight(logRight){
  switch(true){
    case logRight.classList.contains('l1'):
      logRight.classList.remove('l1')
      logRight.classList.add('l5')
      break

      case logRight.classList.contains('l2'):
      logRight.classList.remove('l2')
      logRight.classList.add('l1')
      break

      case logRight.classList.contains('l3'):
      logRight.classList.remove('l3')
      logRight.classList.add('l2')
      break

      case logRight.classList.contains('l4'):
      logRight.classList.remove('l4')
      logRight.classList.add('l3')
      break

      case logRight.classList.contains('l5'):
      logRight.classList.remove('l5')
      logRight.classList.add('l4')
      break
      
  }
}

function moveCarLeft(carLeft){
  switch(true){
    case carLeft.classList.contains('c1'):
      carLeft.classList.remove('c1')
      carLeft.classList.add('c2')
      break

      case carLeft.classList.contains('c2'):
        carLeft.classList.remove('c2')
        carLeft.classList.add('c3')
        break

      case carLeft.classList.contains('c3'):
        carLeft.classList.remove('c3')
        carLeft.classList.add('c1')
        break
      
  }
}

function moveCarRight(carRight){
  switch(true){
    case carRight.classList.contains('c1'):
      carRight.classList.remove('c1')
      carRight.classList.add('c3')
      break

      case carRight.classList.contains('c2'):
      carRight.classList.remove('c2')
      carRight.classList.add('c1')
      break

      case carRight.classList.contains('c3'):
      carRight.classList.remove('c3')
      carRight.classList.add('c2')
      break   
      
  }
}

function lose(){
  if (sqaures[currentIndex].classList.contains('c1') || 
      sqaures[currentIndex].classList.contains('l4') ||
      sqaures[currentIndex].classList.contains('l5') ||
      currentTime<=0
){
    result.textContent= 'You Lose!'
    clearInterval(timerId)
    clearInterval(outcomeImerId)
    sqaures[currentIndex].classList.remove('frog')
    document.removeEventListener('keyup', moveFrog)
  }
}

function win(){
  if(sqaures[currentIndex].classList.contains('ending-block')){
    result.textContent= 'You Win!'
    clearInterval(timerId)
    clearInterval(outcomeImerId)
    document.removeEventListener('keyup', moveFrog)
  }
}

startPauseButton.addEventListener('click', ()=> {
  if(timerId){
    clearInterval(timerId);
    clearInterval(outcomeImerId);
    outcomeImerId=null;
    timerId= null;
    
    document.removeEventListener('keyup', moveFrog)
  } else{
      timerId=setInterval(autoMoveElements,1000)
      outcomeImerId=setInterval(checkOutcome, 50)
      document.addEventListener('keyup', moveFrog)

  }
});
});
