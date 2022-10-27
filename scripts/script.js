'use strict'

let progress, dot, timerSpan;
let popup;

let startButton, stopButton;

let workingSelection, restSelection;

let currentTime, dateFull, timerInterval, pomoType, times, running;

let sound = new Audio("sounds/alarm-sound.wav")

/* functions for buttons */

function _timer(callback) {
    if(!sound.paused) sound.pause();
    if(callback == "start") {
        changeStatus();
        running = true;
        timerInterval = setInterval(timerProgress, 1000);
    }else if(callback == "stop") {
        toggleButton();
        running = false;
        clearInterval(timerInterval);
    }
}

/* after save click */

function loadSettings() {
    times['pomo'] = parseInt(document.getElementById('work-time').value)*60;
    times['rest'] = parseInt(document.getElementById('break-time').value)*60;
    if(times['pomo'] && times['rest']) {
        if(times['pomo'] < 3600 && times['rest'] < 3600) {
            pomoType = 'pomo'
            circleReset();
            if(running) 
                changeStatus();
                running = false;

        }
    }
}

function toggleSettings() {
    popup.classList.toggle('hidden')
}

function applySettings() {
    loadSettings();
    toggleSettings();
}

/* timer for circle */ 

function timerProgress() {
    currentTime += 1
    dateFull.setSeconds(dateFull.getSeconds()-1)
    timerSpan.textContent = dateFull.toISOString().substr(14, 5);
    progress.style.strokeDashoffset = 930 - ((currentTime/times[pomoType])*9.3)*100
    dot.style.transform = `rotate(${currentTime/times[pomoType]*3.6*100}deg`
    if(currentTime >= times[pomoType]) {
        clearInterval(timerInterval)
        pomoType = pomoType == 'pomo' ? pomoType = 'rest' : pomoType='pomo';
        circleReset();
        changeStatus();
        running=false;
        sound.play()
    }
}

/* resetting circle progress and times */

function circleReset() {
    clearInterval(timerInterval)
    currentTime = 0;
    dateFull = new Date(times[pomoType]*1000);
    timerSpan.textContent = dateFull.toISOString().substr(14, 5);
    progress.style.strokeDashoffset = 930
    dot.style.transform = `rotate(0deg)`
}

/* start/stop button and status bar */

function changeStatus() {
    if(pomoType == 'pomo') {
        workingSelection.classList.add('active')
        restSelection.classList.remove('active')
    }else {
        workingSelection.classList.remove('active')
        restSelection.classList.add('active')
    }
    toggleButton()
}

function toggleButton() {
    startButton.classList.toggle('active-btn');
    stopButton.classList.toggle('active-btn');
}

/* loading default values */

function loadVariables() {
    progress = document.getElementById('progress')
    dot = document.getElementsByClassName('circle-dot')[0]
    timerSpan = document.getElementById('timer-span')
    popup = document.getElementsByClassName('settings')[0]
    startButton = document.getElementById('start-button')
    stopButton = document.getElementById('stop-button')
    workingSelection = document.getElementById('working')
    restSelection = document.getElementById('rest')
    pomoType = 'pomo'
    times = {pomo:1500, rest:300};
    circleReset(); 
}

loadVariables();