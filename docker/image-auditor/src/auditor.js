const IP = "239.42.42.42"
const CAST_PORT = 12345
const SRV_PORT = 2205
const INTERVAL_CHECK = 1000
const INTERVAL_KEEP = 5000

var dgram = require("dgram")
var net = require("net")

var multiCast = dgram.createSocket("udp4")

/**
 * Tableau de la liste des musiciens qu'on entend
 */
var musiciansJson = []

/**
 * Action lors de la reception des messages
 */
multiCast.on("message", function (msg, rinfo) {
    console.log(" <<< " + msg)
    var json = JSON.parse(msg)

    // On test si il est deja dans la liste
    for (var i = 0; i < musiciansJson.length; i++) {
        if (json.uuid == musiciansJson[i].uuid) {
            musiciansJson[i].time = new Date();
            return
        }
    }
    // il est pas encore dans la liste, on l'ajoute
    json.time = new Date()
    musiciansJson.push(json)
})

/**
 * Activation de l'écoute sur le port
 */
multiCast.bind(CAST_PORT, function () {
    multiCast.addMembership(IP)
})

/**
 * Création du serveur pour l'interogation telnet et lancement
 */
var srv = net.createServer(function (socket) {
    socket.end(JSON.stringify(musiciansJson))
}).listen(SRV_PORT)

/**
 * Fonction retirant les musiciens si on ne les entends pas pendant 5 secondes
 */
function clean() {
    console.log(" - Try clean")
    var actualTime = new Date()

    for (var i = 0; i < musiciansJson.length; i++) {
        if (actualTime - musiciansJson[i].time > INTERVAL_KEEP) {
            console.log("remove: " + JSON.stringify(musiciansJson[i]))
            musiciansJson.splice(i, 1)
        }
    }
}
setInterval(clean, INTERVAL_CHECK)