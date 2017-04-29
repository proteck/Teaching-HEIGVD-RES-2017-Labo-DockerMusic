var instrument = process.argv[2]

const IP = "239.42.42.42"
const PORT = 12345
const INTERVAL = 1000

/**
 * Liste des sons associé à nos instruments
 */
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

/**
 * Format de nos messages JSON
 */
var json = {
    uuid: uuid.v4(),
    instrument: instrument,
    sound: SOUNDS[instrument]
}

/**
 * Nous renvoie un message JSON sous forme de String
 */
function getMsg() {
    return JSON.stringify(json)
}

/**
 * Envoie du message à travers notre socket
 */
function send() {
    console.log(" >>> " + getMsg())
    socket.send(getMsg(), PORT, IP)
}

setInterval(send, INTERVAL)