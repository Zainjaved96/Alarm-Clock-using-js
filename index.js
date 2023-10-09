"use strict";
var clock = document.getElementById('clock')
var hourSelect = document.getElementById("hour-select")
var minuteSelect = document.getElementById("minute-select")
var todSelect = document.getElementById("tod-select")
var alarm_para= document.getElementById("alarm-para")
var warning = document.getElementById("warning")
var alarmSet = false
var offBtn = document.getElementById("off-btn")
var alarmQuery ; 
var ringtoneSelect = document.getElementById("ringtone-select")
var sound = new Audio("./audios/gangsta paradise.mp3")

const alarmList = []

function main(){
    let date =  new Date()
    var current_tod;
    var hour = date.getHours()
    if (hour > 12 ){
        var hour = hour - 12
        current_tod = "PM"
    }
    else if (hour == 12) {
        current_tod = "PM"
    }
    else {
        current_tod = "AM"
    }
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    clock.innerHTML = `${hour}:${minutes}:${seconds}`
    
    if (alarmSet){
        if (alarmQuery == `${hour}:${minutes} ${current_tod}` && seconds == 1){
           
            console.log("alarm matched")
            alarmSet = false
            alarmRing()
        }
       else {
        console.log(alarmQuery)
        console.log(`${hour}:${minutes} ${current_tod}`)
        console.log(seconds)
        console.log("not matched")
         }
    }
    setTimeout(main, 1000)
}

function addOptions(){
    addHours()
    addMinutes()
}

function addHours(){
    for(let i=1; i <= 12 ; i++ ){
        let option = document.createElement("option")
        option.text = i
        hourSelect.appendChild(option)
    }
}

function addMinutes(){
    for(let i=1; i <=60 ; i++ ){
        let option = document.createElement("option")
        option.text = i
        minuteSelect.appendChild(option)
    }
}


function setAlarm(){
   if (alarmSet){
    warning.innerHTML = "Alarm Already Set! Delete Alarm First"
    warning.classList.add("warning-active")
   }
   else {
   var hour = hourSelect.options[hourSelect.selectedIndex].value
   var minute = minuteSelect.options[minuteSelect.selectedIndex].value
   if (hour=="Hour" || minute == "Minutes"){
        warning.classList.add("warning-active")
   }
   else {
    if (warning.classList.contains("warning-active")){
        warning.classList.remove("warning-active")
    }
   var ringSelected = ringtoneSelect.options[ringtoneSelect.selectedIndex].value
   sound = new Audio(`./audios/${ringSelected}.mp3`)
   var timeOfDay = todSelect.options[todSelect.selectedIndex].value
   alarmQuery = `${hour}:${minute} ${timeOfDay}`
   alarm_para.innerHTML = `Alarm Set for ${alarmQuery} with Ringtone ${ringSelected}`
   if (alarm_para.classList.contains("alert-danger")){
        alarm_para.classList.remove("alert-danger")
        alarm_para.classList.add("alert-info")
   }
   else {
   alarm_para.classList.add("alert", "alert-info" ,"mt-3" ,"mb-2")
   }
   alarmSet = true
        }

}}

function alarmRing(){
    offBtn.classList.add("off-btn-active")
    alarm_para.classList.remove("alert-info")
    alarm_para.classList.add("alert-danger")
    alarm_para.innerHTML = "RINGING !!!!!!!"
   
    sound.play()
    
}

function deleteAlarm(){
    if (alarmSet){
        alarmSet = false
        alarm_para.innerHTML = "Alarm Deleted"
    }
    warning.classList.remove("warning-active")
}


function alarmOff(){
    alarm_para.classList.remove("alert-danger")
    alarm_para.classList.add('alert-success')
    alarm_para.innerHTML = "Alarm Turned off Successfully "
    offBtn.classList.remove("off-btn-active")
    sound.pause()
    
}

addOptions()
main()

