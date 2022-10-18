// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

// Declaring the like button globally and hiding the error message

const likeButton = document.querySelectorAll(".like-glyph");
let err = document.getElementById("modal")
err.classList.add("hidden");

// modifying the page based off the servers response

function likeAction(e) {
  let btn = e.target;
  mimicServerCall()
    .then((resolve) => {
      if (btn.innerText === EMPTY_HEART) {
        btn.innerText = FULL_HEART
        btn.classList.add("activated-heart")
      } else if (btn.innerText === FULL_HEART) {
        btn.innerText = EMPTY_HEART
        btn.classList.remove("activated-heart")
      }
    })
    .catch((reject) => {
      err.classList.remove('hidden')
      const errMessage = document.createElement('h5')
      errMessage.innerText = reject
      errMessage.setAttribute("id", "message")
      err.appendChild(errMessage)
      setTimeout(() => {
        err.classList.add('hidden')
        document.getElementById('message').remove();
      }, 3000)
    })
}

for (const glyph of likeButton) {
  glyph.addEventListener("click", likeAction)
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
