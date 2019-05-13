// Variables
const tweetList = document.getElementById('lista-tweets');



// Event Listeners

eventListeners();

function eventListeners() {
     //Cuando se envia el formulario
     document.querySelector('#formulario').addEventListener('submit', addTweet);

     // Borrar Tweets
     tweetList.addEventListener('click', eraseTweet);

     // Contenido cargado
     document.addEventListener('DOMContentLoaded', localStorageDone);
}



// Funciones


// Añadir tweet del formulario
function addTweet(e) {
     e.preventDefault();
     // leer el valor del textarea
     const tweet = document.getElementById('tweet').value;
     const emoji = document.getElementsByClassName('emoji-items').value;
     // crear boton de eliminar
     const eraseButton = document.createElement('a');
     eraseButton.classList = 'borrar-tweet';
     eraseButton.innerText = '❌';

     // Crear elemento y añadirle el contenido a la lista
     const li = document.createElement('li');
     li.innerText = tweet;

     // añade el botón de borrar al tweet
     li.appendChild(eraseButton);

     // añade el tweet a la lista
     tweetList.appendChild(li);

     // Añadir a Local Storage
     addTweetLocalStorage(tweet, emoji);

     swal({
          title: "🎉!",
          text: "Your task has been added!",
          icon: "success",
          button: "Oh yeah!",
        });
}
// Elimina el Tweet del DOM
function eraseTweet(e) {
     e.preventDefault();
     swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover you task!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) { 
               if(e.target.className === 'borrar-tweet', 'decoration') {
                    e.target.parentElement.remove();
                    eraseTweetLocalStorage(e.target.parentElement.innerText);
            swal("Poof! Your task has been deleted!", {
              icon: "success",
            });
          }
          } else {
            swal("Your task is safe!", {
                 icon: "info",
            });
          }
        });
     
}


// Mostrar datos de LocalStorage en la lista
function localStorageDone() {
     let tweets, emojis;

     tweets = getTweetsLocalStorage();

     emojis = getTweetsLocalStorage();

     tweets.forEach(function(tweet, emoji) {
          // crear boton de eliminar
          const eraseButton = document.createElement('a');
          eraseButton.classList = 'borrar-tweet';
          eraseButton.innerText = '❌';

          // Crear elemento y añadirle el contenido a la lista
          const li = document.createElement('li');
          li.innerText = tweet;
          
          // añade el botón de borrar al tweet
          li.appendChild(eraseButton);

          // añade el tweet a la lista
          tweetList.appendChild(li);
     });
}

// Agrega tweet a local storage
function addTweetLocalStorage(tweet, emoji) {
     let tweets;
     tweets = getTweetsLocalStorage();
     // Añadir el nuevo tweet
     tweets.push(tweet);
     // Convertir de string a arreglo para local storage
     localStorage.setItem('tweets', JSON.stringify(tweets) );
}

// Comprobar que haya elementos en localstorage, retorna un arreglo
function getTweetsLocalStorage() {
     let tweets;
     // Revisamos los valoes de local storage
     if(localStorage.getItem('tweets') === null) {
          tweets = []; 
     } else {
          tweets = JSON.parse(localStorage.getItem('tweets') );
     }
     return tweets;
}

// Eliminar tweet de Local Storage

function eraseTweetLocalStorage(tweet, emoji) {

     let tweets, tweetErase;
     // Elimina la X del tweet
     tweetErase = tweet.substring(0, tweet.length - 1);

     tweets = getTweetsLocalStorage();

     tweets.forEach(function(tweet, emoji, index) {
          if(tweetErase === tweet) {
               tweets.splice(index, 1);
          }
     }) ;

     localStorage.setItem('tweets', JSON.stringify(tweets) );
}


// Buttons
function white() {
     document.body.style.backgroundColor = "white";
     document.body.style.color = "black";
     document.querySelector('.emoji-picker-icon').style.color = "black";
   }

function black() {
     document.body.style.backgroundColor = "#191919";
     document.body.style.color = "white";
     document.querySelector('.emoji-picker-icon').style.color = "white";
     document.getElementsByName('text').style.border = "white";
   }

