var clock;
var hour = 0;
var minute = 0;
var second = 0;
var milisecond = 0;
var reseta = false;
var startStop = false; // falso quando não startou 
var botaoReseta;
var botaoLap;
var hourDOM = document.getElementById("hour");
var minuteDOM = document.getElementById("minute");
var secondDOM = document.getElementById("second");
var milisecondDOM = document.getElementById("milisecond");
var currentTime = []
var contaLap = 0;


//Inicia cronometro, e se não existe, cria o botão Lap

function boraLa() {
    if(!startStop){
        start();
        document.getElementById("start-stop").innerHTML = 'STOP'
    }else{
        stopTimer();
        document.getElementById("start-stop").innerHTML = 'START'
    }
}


// starta e cria o botão LAP
function start() {
    startStop = true;
    clearInterval(clock)
    clock = setInterval(timer, 10)
    if (botaoLap === undefined) {
        botaoLap = document.createElement('button')
        botaoLap.className = "btn"
        botaoLap.innerHTML = "LAP"
        botaoLap.onclick = (lap)
        document.getElementById("botoes").appendChild(botaoLap)
    }
}

//Roda à cada 10ms
function timer() {
    milisecond += 1;

    if (hour >= 60) {
        minute = 0
        second = 0
        milisecond = 0
    } else if (minute >= 60) {
        second = 0
        milisecond = 0
        hour++
    } else if (second >= 60) {
        second = 0
        minute++
    } else if (milisecond >= 100) {
        second++
        milisecond = 0
    }
    
    currentTime= testNumber(hour,minute,second,milisecond)
    
    //mostra no visor
    hourDOM.innerHTML = currentTime[0];
    minuteDOM.innerHTML = currentTime[1]
    secondDOM.innerHTML = currentTime[2];
    milisecondDOM.innerHTML = currentTime[3]
    
    // console.log(currentTime)
  
}

//"PARA PARA PARA PARA PARAEE PARAEEE" - Kleber, JOAO 
function stopTimer() {
    startStop = false;
    clearInterval(clock)
    //cria botão reset se n existe e se clock já foi definido
    if (botaoReseta === undefined && clock !== undefined) {
        botaoReseta = document.createElement('button')
        botaoReseta.className = "btn"
        botaoReseta.innerHTML = "RESET"
        botaoReseta.onclick = (reset)
        botaoReseta.style = "margin-left: +5px;"
        document.getElementById("botoes").appendChild(botaoReseta)
    }

    //zera tudo e esconde a div das laps
    function reset() {
        contaLap = 0
        hour = 0;
        hourDOM.innerHTML = "00"
        minute = 0;
        minuteDOM.innerHTML = "00"
        second = 0;
        secondDOM.innerHTML = "00"
        milisecond = 0;
        milisecondDOM.innerHTML = "00"
        document.getElementById("lap-times").innerHTML = ""
        document.getElementById("laps").style = "visibility: hidden;"
    }
}


//deixa a lap visivel e vai mostrando as paradinhas
function lap() {
    document.getElementById("laps").style = "visibility: visible;"
    contaLap++
    var tempo = document.createElement("tr")
    tempo.className = "laps";
    tempo.innerHTML = `${contaLap}#   ${currentTime[0]}'${currentTime[1]}'${currentTime[2]}.${currentTime[3]}ms`;
    document.getElementById("lap-times").appendChild(tempo);
}

//coloca o 0 na frente do digito pra ficar batuta visualmente
function testNumber(hour,minute,second,milisecond) {
    let number = [hour,minute,second,milisecond];

    for (x=0; x<=3; x++ ){
        if (number[x] > 9){
            number[x] = "" + number[x]
        }else{
            number[x] = "0" + number[x]
        }
    }
    return number
}