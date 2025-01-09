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

      } catch (error) {
        console.error('Error fetching activity:', error);
      }
}

function changeContent(data){

  questionElem.innerHTML = `${data[0].question}`;

  answerElem.innerHTML = `${data[0].correct_answer}` + `${data[0].incorrect_answers}`;

}

