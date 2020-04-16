const pepText = "You aren't stupid. You're a beautiful flower"


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
      transcript = latestResult[0].transcript
      wordsHeard.push(...transcript.split(" ").filter( x => x!= ""))
      console.log(wordsHeard.join(" "))
      console.log(`Count of words: ${wordsHeard.length}`)
      if (transcript.indexOf("I'm so stupid") > -1) {
        const pepTalk = new SpeechSynthesisUtterance(pepText)
        window.speechSynthesis.speak(pepTalk)
      }
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