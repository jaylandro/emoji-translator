const form = document.getElementById("et");
const results = document.getElementById("results");

function postData() {
  const emojiInput = document.getElementById("emojify").value;

  event.preventDefault();
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
    results.innerHTML = data;
  })
  .catch(error => console.error(error));
}

// attach event listener
form.addEventListener("submit", postData, true);