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
    console.log('onresult: ',event);
  }
  recognition.onerror = function(event) {
    console.log('onerror: ',event);
  }
  recognition.onend = function() {
    console.log('onend: ', event);
  }
}