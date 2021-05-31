let color = ['green', 'red', 'yellow', 'blue', 'purple'];
let body = document.body;
let windoWidth = window.innerWidth;
let windoHeight = window.innerHeight;
let socre = document.querySelectorAll('.score');
let num =0;
let total = 100;
let currentBallon =0;
let gameOover =false;
let btStart = document.querySelector('.bt-start');
let totalShadow = document.querySelector('.total-shadow');



function creatBallon(){
    let div = document.createElement('div');
    let rand = Math.floor(Math.random()*color.length);
    div.className='ballon ballon-'+color[rand];

    rand = Math.floor(Math.random()* (windoWidth-100));
    div.style.left=rand+'px';

    div.dataset.number=currentBallon;
    currentBallon++;

    body.appendChild(div);
    animateBallon(div);
}

function animateBallon(elem){
    let pos =0;
    let rand = Math.floor(Math.random() *6 -3);
    let interval = setInterval(move, 12 - Math.floor(num/10) + rand);
    function move(){
        if(pos>=(windoHeight + 200) && document.querySelector('[data-number="'+elem.dataset.number+'"]') !==null){
            clearInterval(interval);
            gameOover = true;
            
        }
        else{
            pos++;
            elem.style.top=windoHeight-pos+'px';
        }
    }
}
function deletBallon(elem){
    elem.remove();
    num++;
    updateScore();
    playSound();
   
}
function playSound(){
    let audio = document.createElement('audio');
    audio.src= 'sound/click.wav';
    audio.play();
}
function updateScore(){
    for(i=0; i< socre.length; i++){
        socre[i].textContent=num;
    }

}

function startGame (){
    restartGame();
    let timeout =0;
    let loop = setInterval(function(){
       timeout= Math.floor(Math.random()*600 -100);
        if(!gameOover && num !== total){
            creatBallon();
        }else if (num !== total){
            clearInterval(loop);
            totalShadow.style.display='flex';
            totalShadow.querySelector('.lose').style.display='block';
        }
        else{
            clearInterval(loop);
            totalShadow.style.display='flex';
            totalShadow.querySelector('.win').style.display="block";
        }
    },800 +timeout)
}

function restartGame(){
    let forRemove = document.querySelectorAll('.ballon');
    for(i=0; i<forRemove.length; i++){
        forRemove[i].remove();
    }
    gameOover= false;
    num = 0;
    updateScore();
}

document.addEventListener('click',function(event){
    if(event.target.classList.contains('ballon')){
        deletBallon(event.target);
    }
})

document.querySelector('.restart').addEventListener('click',function(){
    totalShadow.style.display='none';
    totalShadow.querySelector('.lose').style.display='none';
    totalShadow.querySelector('.win').style.display='none';
    startGame();
})

document.querySelector('.close').addEventListener('click',function(){
    totalShadow.style.display='none';
})

btStart.addEventListener('click',function(){
    startGame();
    document.querySelector('.shro').style.display='none';
    document.querySelector('.music').play();
})
