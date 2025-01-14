window.onload = function(){
    fetchQuestions();
}

async function fetchQuestions(){

    let url = "https://opentdb.com/api.php?amount=10";
    //let url = "questions.json";

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
        
        updateQuestions(data);
        fetchImages(data);

      } catch (error) {
        console.error('Error fetching activity:', error);
      }
}


function updateQuestions(data){
  
  var elemDiv = document.getElementById("lightbox");
  var elemQuestion = document.getElementById("quest");
  var elemAnswer = document.createElement("p");

  elemQuestion.innerHTML = "Question:" + data.results[0].question;
  elemAnswer.innerHTML = "Answers:" + data.results[0].correct_answer;

  for (let i = 0; i<data.results[0].incorrect_answers.length; i++){
    elemAnswer.innerHTML += " " + data.results[0].incorrect_answers[i] + " ";
}
  elemDiv.appendChild(elemQuestion);
  elemDiv.appendChild(elemAnswer);
}

const headers = {
    "Authorization": "nSbK5mBbGa4GICHuTLoyAjx95K5fsPXTHBN8O9Jtu2eJTgRpHwwgXFQJ"
};

async function fetchImages(data){

  const search = data.results[0].correct_answer;

  const url = "https://api.pexels.com/v1/search?per_page=1&query=" + search;

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

}

function updateImages(data){
  var elemDiv = document.getElementById("lightbox");
  var elemImg = document.createElement("img");
  elemImg.src = data.photos[0].src.small;
  elemDiv.appendChild(elemImg);
}

function openLightbox(){
  document.getElementById("lightbox").style.display = "block";  
}

function closeLightbox(){
  document.getElementById("lightbox").style.display = "none";
}