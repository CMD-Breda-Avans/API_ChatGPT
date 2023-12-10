const answerElement = document.getElementById('gptResponse');
const myInput = document.getElementById('myInput');
const myButton = document.getElementById('myButton');

myButton.addEventListener('click', () => { askChatGPT(); });
myInput.addEventListener('keydown', (e) => { 
    if(e.code === 'Enter'){askChatGPT();}
 });


function askChatGPT(){
    const question = myInput.value; // Get the input value, the question
    fetch(`http://localhost:3000/getResponse?question=${question}`, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            answerElement.innerHTML += data.message;
        })
        .catch((error) => {
            answerElement.innerHTML = 'An error occurred: ' + error.message;
        });

}