var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

let recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;


let isListening = false;
// let resultIndex = 0

recognition.onstart = function () {
  console.log(`Am I listening?? ${isListening}`)
  wordsHeard = []
}

recognition.onresult = function (event) {
  let latestResult = event.results[event.resultIndex]
  if (latestResult.isFinal) {
      wordsHeard.push(...latestResult[0].transcript.split(" "))
      // resultIndex += 1
      console.log(wordsHeard)
      console.log(`Count of words: ${wordsHeard.length}`)
    }
}



let micButton = document.getElementById("micOn")
micButton.addEventListener("click", function () {
  if (!isListening) {
    console.log("Turning on Mic")
    isListening = true
    recognition.start()
  }
})