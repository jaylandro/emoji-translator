let final_transcript;
let emojiInput = document.getElementById;

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onstart = function(event) {
    console.log('onstart: ',event);
  }
  recognition.onresult = function(event) {
    var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    
    emojiInput.innerHTML = interim_transcript;
    emojiInput.innerHTML = final_transcript;
  }
  recognition.onerror = function(event) {
    console.log('onerror: ',event);
  }
  recognition.onend = function() {
    console.log('onend: ', event);
  }
}