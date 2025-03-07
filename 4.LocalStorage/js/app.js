// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Event Listeners
eventListener();

function eventListener() {
  // Cuando usuario agrega uevo tweet
  formulario.addEventListener("submit", agregarTweet);

  // Cuando el documento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    crearHTML();
  });
}

// Funciones
function agregarTweet(e) {
  e.preventDefault();

  const tweet = document.querySelector("#tweet").value.trim();

  if (tweet === "") {
    mostrarError("Agrega comentario");
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  tweets = [...tweets, tweetObj];

  crearHTML();

  formulario.reset();
}

// Mostrar error
function mostrarError(error) {
  const mensajeError = document.createElement("P");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

// Muestra lista de Tweets
function crearHTML() {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";

      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      const li = document.createElement("li");

      li.innerText = tweet.tweet;

      li.appendChild(btnEliminar);

      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

// Agrega los tweets
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);

  crearHTML();
}

// Limpiar HTML
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
