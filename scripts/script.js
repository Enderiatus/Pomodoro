'use strict'

let progress = document.getElementById('progress')
let dot = document.getElementsByClassName('circle-dot')[0]
let timer = document.getElementById('timer-span')
let popup = document.getElementsByClassName('settings')[0]

let startButton = document.getElementById('start-button')
let stopButton = document.getElementById('stop-button')

let workingSelection = document.getElementById('working')
let restSelection = document.getElementById('rest')

let work_time = 0;
let rest_time = 0;

let secTotal = 0;
let secLeft = 0;
let dateFull = 0;
let timerInterval = null;

let running = false;
let pomotype = null;

let sound = new Audio("sounds/alarm-sound.wav")

function _timer(callback) {
    if(callback == "start") {
        sound.pause()
        if(!secTotal > 0) 
            return;
        if (!running) {
            running = true
            /*
            if(secTotal == 0) {
                secTotal = new Date(document.getElementById('timer-span').textContent.split(':')[0]*60*1000+document.getElementById('timer-span').textContent.split(':')[1]*1000).getTime()/1000
                secLeft = 0
                dateFull = new Date(secTotal*1000);
            } */
            toggleButtons();
            changeWorking();
            timerInterval = setInterval(() => {
                secLeft += 1
                dateFull.setSeconds(dateFull.getSeconds()-1)
                document.getElementById('timer-span').textContent = dateFull.toISOString().substr(14, 5);
                progress.style.strokeDashoffset = 930 - ((secLeft/secTotal)*9.3)*100
                //console.log(secLeft/secTotal*3.6*100)
                //console.log(930 - ((secLeft/secTotal)*9.3)*100)
                dot.style.transform = `rotate(${secLeft/secTotal*3.6*100}deg`
                if(secLeft >= secTotal) {
                    clearInterval(timerInterval)
                    if(pomotype) {
                        secTotal = rest_time*60;
                        dateFull = new Date(secTotal*1000);
                        secLeft = 0;
                        document.getElementById('timer-span').textContent = dateFull.toISOString().substr(14, 5);
                        dot.style.transform = `rotate(0deg)`
                        progress.style.strokeDashoffset = 930;
                        timerInterval = null;
                        changeWorking();
                        toggleButtons();
                        pomotype = false;
                    }else {
                        loadSettings();
                        changeWorking();
                        toggleButtons();
                    }
                    running = false;
                    sound.play()
                }
            }, 10);
        }
    }else if(callback == "stop") {
        clearInterval(timerInterval)
        changeWorking();
        toggleButtons();
        running = false;
    }
    
}

function toggleSettings() {
    popup.classList.toggle('hidden')
}

function applySettings() {
    loadSettings();
    toggleSettings();
}


function loadSettings() {
    work_time = document.getElementById('work-time').value;
    rest_time = document.getElementById('break-time').value;
    if(work_time && rest_time) {
        if(work_time < 60 && rest_time < 60) {
            secTotal = work_time*60;
            dateFull = new Date(secTotal*1000);
            secLeft = 0;
            document.getElementById('timer-span').textContent = dateFull.toISOString().substr(14, 5);
            dot.style.transform = `rotate(0deg)`
            progress.style.strokeDashoffset = 930;
            timerInterval = null;
            pomotype = true
        }
    }
}

function toggleButtons() {
    startButton.classList.toggle('active-btn');
    stopButton.classList.toggle('active-btn');
}

function changeWorking() {
    if(pomotype) {
        workingSelection.classList.add('active')
        restSelection.classList.remove('active')
    }else {
        workingSelection.classList.remove('active')
        restSelection.classList.add('active')
    }
    
}