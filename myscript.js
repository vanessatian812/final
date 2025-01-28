//Add points system
//End after 400 points

window.onload = function(){
    //fetchQuestions();
}

// handle install prompt
//Code taken from mdinfotech.net
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    installButton.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
});           


// load the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }, function(error) {
      console.log('Service Worker registration failed:', error);
    });
  });
}                  

//End of code from mdinfotech.net         


function openLightbox(num){
  document.getElementById("lightbox").style.display = "block";

  fetchQuestions(num);  
}

async function fetchQuestions(num){

    let url = "";
    let baseUrl = "https://opentdb.com/api.php?amount=1";

    if (num == 1){
      url = baseUrl + "&category=20&difficulty=easy&type=multiple";
      points = 50;
    } else if (num == 2){
      url = baseUrl + "&category=20&difficulty=medium&type=multiple";
      points = 100;
    } else if (num == 3){
      url = baseUrl + "&category=20&difficulty=medium&type=multiple";
      points = 150;
    } else if (num == 4){
      url = baseUrl + "&category=20&difficulty=hard&type=multiple";
      points = 200;
    } else if (num == 5){
      url = baseUrl + "&category=23&difficulty=easy&type=multiple";
      points = 50;
    } else if (num == 6){
      url = baseUrl + "&category=23&difficulty=medium&type=multiple";
      points = 100;
    } else if (num == 7){
      url = baseUrl + "&category=23&difficulty=medium&type=multiple";
      points = 150;
    } else if (num == 8){
      url = baseUrl + "&category=23&difficulty=hard&type=multiple";
      points = 200;
    } else if (num == 9){
      url = baseUrl + "&category=26&difficulty=easy&type=multiple";
      points = 50;
    } else if (num == 10){
      url = baseUrl + "&category=26&difficulty=medium&type=multiple";
      points = 100;
    } else if (num == 11){
      url = baseUrl + "&category=26&difficulty=medium&type=multiple";
      points = 150;
    } else if (num == 12){
      url = baseUrl + "&category=26&difficulty=hard&type=multiple";
      points = 200;
    } else if (num == 13){
      url = baseUrl + "&category=18&difficulty=easy&type=multiple";
      points = 50;
    } else if (num == 14){
      url = baseUrl + "&category=18&difficulty=medium&type=multiple";
      points = 100;
    } else if (num == 15){
      url = baseUrl + "&category=18&difficulty=medium&type=multiple";
      points = 150;
    } else if (num == 16){
      url = baseUrl + "&category=18&difficulty=hard&type=multiple";
      points = 200;
    }

    try {
        const response = await fetch(url);
        
        const data = await response.json();
        console.log(data);

        updateQuestions(data, score, points);
        fetchImages(data);

      } catch (error) {
        console.error('Error fetching activity:', error);
      }
}


function updateQuestions(data, score, points) {
  var elemPoints = document.getElementById("points");
  var elemLight = document.getElementById("lightbox");
  var elemDiv = document.createElement("div");
  var elemQuestion = document.createElement("p");
  var xIcon = document.createElement("h1");

  elemLight.innerHTML = "";

  xIcon.innerHTML = "x";
  xIcon.style.textAlign = 'right';
  elemQuestion.innerHTML = data.results[0].question;

  xIcon.onclick = closeLightbox;
  elemDiv.appendChild(xIcon);
  elemDiv.appendChild(elemQuestion);


  //Code from ChatGPT
  const answers = [...data.results[0].incorrect_answers, data.results[0].correct_answer];

  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]]; // Swap elements
  }
  //End of code from ChatGPT

  answers.forEach((answer) => {
    var answerButtons = document.createElement("button");
    answerButtons.innerHTML = answer;
    answerButtons.onclick = () => {
      if (answer === data.results[0].correct_answer) {
        alert("Correct!");
        score = (score + points);
        elemPoints.innerHTML = "Points: " + score;
      } else {
        alert("Incorrect!");
        score = (score - points);
        elemPoints.innerHTML = "Points: " + score;
      }
    };
    answerButtons.style.color = '#CCA128';
    answerButtons.style.backgroundColor = '#072476';
    answerButtons.style.padding = '1rem';
    answerButtons.style.margin = '1rem';
    answerButtons.style.fontSize = '1em';
    elemLight.style.overflowX = 'scroll';
    elemDiv.appendChild(answerButtons);
  });

  elemLight.appendChild(elemDiv);
}


const headers = {
    "Authorization": "nSbK5mBbGa4GICHuTLoyAjx95K5fsPXTHBN8O9Jtu2eJTgRpHwwgXFQJ"
};

async function fetchImages(data){

  const search = data.results[0].correct_answer;

  const url = "https://api.pexels.com/v1/search?per_page=1&query=" + search;

  //Code taken from mdinfotech.net
  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    updateImages(data);
    return data;

  } catch (error) {
    console.error("Error fetching data:", error);
  }
  //End of code from mdinfotech.net

}

function updateImages(data){
  var elemDiv = document.getElementById("lightbox");
  var elemImg = document.createElement("img");
  elemImg.src = data.photos[0].src.small;
  elemDiv.appendChild(elemImg);
}

function closeLightbox(){
  document.getElementById("lightbox").style.display = "none";
}