const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const axios = require("axios").default;
const qs = require('qs');
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


const { MessagingResponse } = require('twilio').twiml;

app.post('/', async (req, res) => {
    const { body } = req;

    console.log(body)
    let message = '';
    try {
        const { data: { data: { translations } } } = await axios.post('https://google-translate1.p.rapidapi.com/language/translate/v2',
        qs.stringify({ q: req.body.Body, target: 'ta', source: 'en' })
        , {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'accept-encoding': 'application/gzip',
                'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
                'x-rapidapi-key': '7dc4f1c407msh1b9c113d5c29d70p1134acjsnf82e33f1d455'
            },
        })


    res.set('Content-Type', 'text/xml');
    res.send(new MessagingResponse().message(translations[0].translatedText).toString()).status(200);
    } catch(error) {
        console.log(error)
    }

});


