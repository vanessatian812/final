window.onload = function(){

  questionElem = document.getElementById("question");
  answerElem = document.getElementById("answers");
    fetchQuestions();
}

async function fetchQuestions(){

    let url = "https://opentdb.com/api.php?amount=10";
    //let url = "questions.json";

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
        
        changeContent(data);
        fetchImages(data);

      } catch (error) {
        console.error('Error fetching activity:', error);
      }
}

function changeContent(data){

  questionElem.innerHTML = "Question:" + data.results[0].question;

  answerElem.innerHTML = "Answers:" + data.results[0].correct_answer;

  for (let i = 0; i<data.results[0].incorrect_answers.length; i++){
    answerElem.innerHTML += " " + data.results[0].incorrect_answers[i] + " ";
}

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
    return data;
} catch (error) {
    console.error("Error fetching data:", error);
}

}

