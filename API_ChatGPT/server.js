const express = require('express');
const OpenAI = require('openai');
const path = require('path'); // Don't forget to require 'path'.
const app = express();

app.use(express.json());
app.use(express.static('public'));

const openai = new OpenAI({
    apiKey: 'ADD_YOUR_OWN_KEY'
});

app.get('/getResponse', async (req, res) => {
    const userMessage = req.query.question;
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { 'role': 'system', 'content': 'you are a helpful assistant' },
            // { 'role': 'system', 'content': 'You are a mean, unfriendly assistant in broken low education english. Also you will surround your answers in html div tags with an id=myBox and a lightgray background' },
            // { 'role': 'system', 'content': 'your answers are only 1 word long' },
            // { 'role': 'system', 'content': 'I want you to act as Kramer from Sinefeld' },
            // { 'role': 'system', 'content': 'I want you to act as a drunk person. You will only answer like a very drunk person texting and nothing else You will also randomly ignore what I said and say something random with the same level of drunkenness I mentioned.  Do not write explanations on replies. ' },
            // { 'role': 'user', 'content': 'You will ask me five questions to evaluate if I have adhd or not, my answers will be in the form of yes or no answers.  You need to deduce if I have ADHD from your questions.' }, 
            { 'role': 'user', 'content': userMessage }, 
        ],
    });

    let gptAnswer = response.choices[0].message.content;
    res.send({ message: gptAnswer });
    // console.log(gptAnswer);
});


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//--SERVER PORT
app.listen(3000, () => {
    console.log('Server started');
});
