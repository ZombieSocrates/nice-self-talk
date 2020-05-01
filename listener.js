const pepText = "You aren't stupid. You're a beautiful flower"


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

let recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;

const cacheSize = 100;
let isListening = false;

function limitTranscript(arr, N) {
  return arr.length <= N ? arr : arr.slice(begin = arr.length - N)
}


recognition.onstart = function () {
  console.log(`Am I listening?? ${isListening}`)
  wordsHeard = []
}

recognition.onresult = function (event) {
  let latestResult = event.results[event.resultIndex]
  if (latestResult.isFinal) {
      transcript = latestResult[0].transcript
      wordsHeard.push(...transcript.split(" ").filter( x => x!= ""))
      wordsHeard = limitTranscript(wordsHeard, cacheSize)
      console.log(wordsHeard.join(" "))
      console.log(`Count of words: ${wordsHeard.length}`)
      /* TODO: Make this a more generalized regex that picks up on several
      negative phrases*/
      if (transcript.indexOf("I'm so stupid") > -1) {
        const pepTalk = new SpeechSynthesisUtterance(pepText)
        window.speechSynthesis.speak(pepTalk)
      }
    }
}



let micButton = document.getElementById("micControl")
let micNotif = document.getElementById("micAdvisory")
micButton.addEventListener("change", function () {
  if (!isListening) {
    recognition.start()
    console.log("Turning on Mic")
    isListening = true
    micNotif.style.visibility = "visible"
  }
  else {
    recognition.stop()
    console.log("Turning off Mic")
    isListening = false
    micNotif.style.visibility = "hidden"
  }
})