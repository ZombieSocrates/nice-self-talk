document.addEventListener('DOMContentLoaded', function() {
  if (!('speechSynthesis' in window)) {
      upgrade();
    }
  let micButton = document.getElementById("micOn")
  micButton.addEventListener('click', function() {
    const greetText = "Listening for negative self-talk..."
    const greetMsg = new SpeechSynthesisUtterance(greetText)
    window.speechSynthesis.speak(greetMsg)
  })
})