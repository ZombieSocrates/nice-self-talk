const critPattern = /((I )|(I'm ))((\w|\*|\%)+ ){0,3}((stupid)|(dumb)|(moron)|(suck)|(idiot)|(worthless)|(terrible)|(awful)|(worst)|(loser)|(s\*\*\*)|(shity))/;

const restructQuestions = [
  "Are you seeing things in black and white, when it's actually more complicated.",
  "Do you think a friend would say that about you.",
  "What's the evidence for that statement, and what's the evidence against it.",
  "Do you want to believe that about yourself.",
  "Is that based on facts, or on emotions."
]

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

function choosePepTalk(questionArr) {
   const pepIntro = "I think I heard you criticize yourself."
   let pepIndex = Math.floor(Math.random() * questionArr.length)
   return `${pepIntro} ${questionArr[pepIndex]}`
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
      if (transcript.match(critPattern) !== null) {
        const pepText = choosePepTalk(restructQuestions)
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