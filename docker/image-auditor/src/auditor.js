const IP = "239.42.42.42"
const CAST_PORT = 12345
const SRV_PORT = 2205

var dgram = require("dgram")
var net = require("net")

var multiCast = dgram.createSocket("udp4")

var musiciansJson = []

multiCast.on("message", function(msg, rinfo) {
    console.log(" <<< " + msg)
    var json = JSON.parse(msg)

    // On test si il est deja dans la liste
    for(var i = 0; i < musiciansJson.length; i++) {
        if(json.uuid == musiciansJson[i].uuid) {
            musiciansJson[i].time = new Date();
            return 
        }
    }
    // il est pas encore dans la liste, on l'ajoute
    json.time = new Date()
    musiciansJson.push(json)
})

multiCast.bind(CAST_PORT, function() {
    multiCast.addMembership(IP)
})

var srv = net.createServer(function (socket) {
    socket.end(JSON.stringify(musiciansJson))
}).listen(SRV_PORT)