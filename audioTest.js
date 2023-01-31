console.log("working")

var sound = new Audio(`./${alarmOff}/alarm.mp3`)

function play(){
    console.log("playing")
    sound.play()
}

function pause(){
    sound.pause()
}