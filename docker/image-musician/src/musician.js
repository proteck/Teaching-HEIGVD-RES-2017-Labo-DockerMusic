var instrument = process.argv[2]

const IP = "239.42.42.42"
const PORT = 12345
const INTERVAL = 1000

const SOUNDS = {
    piano: "ti-ta-ti",
    trumpet: "pouet",
    flute: "trulu",
    violin: "gzi-gzi",
    drum: "boum-boum"
}

var uuid = require("uuid")
var dgram = require("dgram")

var socket = dgram.createSocket("udp4");

var json = {
    uuid: uuid.v4(),
    instrument: instrument,
    sound: SOUNDS[instrument]
}

function getMsg() {
    return JSON.stringify(json)
}

function send() {
    console.log(" >>> " + getMsg())
    socket.send(getMsg(), PORT, IP)
}


setInterval(send, INTERVAL)