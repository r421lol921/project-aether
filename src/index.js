import Login from './scenes/Login.js';
import Load from './scenes/Load.js';
import World from './scenes/World.js';

var loginServer = null
var global = {}

try {
	loginServer = new WebSocket("ws://localhost:6112")

	loginServer.onmessage = function(event) {
		console.log("[PACKET RECEIVED] => " + event.data)
		var packet = event.data.split('%')
		var packetType = packet[2]
		var packetContent = packet[4]
		if (packetType == "l"){
			global.credentials = packetContent
			var friendsLogin = packet[5]
			var worldPop = packet[7]
			worldPop = worldPop.split('|')
		}
	}
} catch(e) {
	console.warn("Login server not available:", e.message)
}

export function sendXMLPacket(packet){
	if (loginServer && loginServer.readyState === WebSocket.OPEN) {
		loginServer.send(packet)
	}
}

export function getCredentials(){
	return global.credentials
}

window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 1520,
		height: 960,
		type: Phaser.AUTO,
		backgroundColor: "#242424",
		parent: 'game',
		dom: {
			createContainer: true
		},
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		scene: {
			create: create
		}
	});

});

function create() {
	this.scene.add("Login", Login, false);
	this.scene.add("Load", Load, false);
	this.scene.add("World", World, false);
	this.scene.start("Login");
}
