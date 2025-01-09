
window.onload = function(){
    fetchQuestions();
}

async function fetchQuestions(){

    //let url = "https://opentdb.com/api.php?amount=1";
    let url = src="questions.json";

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

      } catch (error) {
        console.error('Error fetching activity:', error);
      }
}

