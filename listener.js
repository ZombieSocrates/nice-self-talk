var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

let recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
let isListening = false;

recognition.onstart = function () {
	console.log(`Am I listening?? ${isListening}`)
	wordsHeard = ""
}


let micButton = document.getElementById("micOn")
micButton.addEventListener("click", function () {
	if (!isListening) {
		console.log("Turning on Mic")
		isListening = true
		recognition.start()
	}
})