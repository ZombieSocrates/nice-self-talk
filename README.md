# nice-self-talk
A Chrome extension that encourages positive self talk, making use of Google & Mozilla's [Web Speech API](https://wicg.github.io/speech-api/).

## how it works
- Clicking the extension gives you the option to **turn your mic on.**
- Once the mic is turned on, voice to text is run in the background, and a cache of the last 10 or so words you speak is kept in memory
- If that cache contains a phrase like *"I'm stupid"* or *"I'm dumb"*, the browser speaks to you and encourages you to feel kind.


## TODO
- Give an obvious indication in browser that speech is being recorded (*see example [here](https://wicg.github.io/speech-api/#security)*) 
