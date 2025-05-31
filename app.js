
function startRecognition() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'pt-BR';
  recognition.start();

  recognition.onresult = function(event) {
    const text = event.results[0][0].transcript;
    translateText(text);
  };

  recognition.onerror = function(event) {
    alert("Erro ao reconhecer voz: " + event.error);
  };
}

async function translateText(text) {
  const translated = await fetch("https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) + "&langpair=pt|en")
    .then(response => response.json())
    .then(data => data.responseData.translatedText);

  const utterance = new SpeechSynthesisUtterance(translated);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}
