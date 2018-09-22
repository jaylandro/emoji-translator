const form = document.getElementById("et");
const emojiInput = document.getElementById("emojify").value;
const results = document.getElementById("results");

function postData() {
  event.preventDefault();
  return fetch('/api/translate', {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: emojiInput,
  })
  .then(response => {
    return response.json()
  })
  .then(data => {
    results.innerHTML = data;
  })
  .catch(error => console.error(error));
}

// attach event listener
form.addEventListener("submit", postData, true);