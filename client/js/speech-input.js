let final_transcript = '';
let emojiInput = document.getElementById('emojify');

if (!('webkitSpeechRecognition' in window)) {
  document.getElementById('voiceButton').style.display = "none"
  console.warn('Speech recognition is not supported in your browser :(')
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onstart = function(event) {
    emojiInput.value = '';
    final_transcript = '';
    console.log('onstart: ',event);
  }
  recognition.onresult = function(event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if(event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      }
    }
    
    console.log('final ', final_transcript)
    console.log(event.results)
    emojiInput.value = final_transcript;
  }
  recognition.onerror = function(event) {
    console.log('onerror: ',event);
  }
  recognition.onend = function() {
    postData();
    console.log('onend: ', event);
  }
}