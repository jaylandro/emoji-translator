const form = document.getElementById("et");
const results = document.getElementById("results");

function postData(event) {
  const emojiInput = document.getElementById("emojify").value;
  
  if (emojiInput.trim().length < 1) {
    return
  }
  
  console.log(emojiInput)
  return fetch('/api/translate', {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        input: emojiInput
      }),
  })
  .then(response => {
    return response.json()
  })
  .then(data => {
    let formattedData = data.join("");
    let resultAnchor = document.getElementById('results');
    let h = document.createElement('h2');
    h.innerHTML = `${emojiInput}  ${formattedData}`;
    resultAnchor.prepend(h);
  })
  .catch(error => console.error(error));
}

// attach event listener
form.addEventListener("submit", event => {
  event.preventDefault();
  postData();
}, true);