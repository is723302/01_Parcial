const express = require('express')
const path = require('path');
const app = express();
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
require("dotenv").config();

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || "0.0.0.0"

// Pass IAM credentials to gain access to API
const toneAnalyzer = new ToneAnalyzerV3({
    version: process.env.TONE_ANALYZER_VERSION,
    authenticator: new IamAuthenticator({
        apikey: process.env.TONE_ANALYZER_API_KEY,
    }),
    serviceUrl: process.env.TONE_ANALYZER_URL,
});

// POST method route
app.post('/', function (req, res) {
    // Text to pass to API
    let text = req.body.userinput
    console.log("texto:" + text)
    // Object to send to API and return JSON file
    const toneParams = {
        toneInput: { 'text': text },
        contentType: 'application/json',
    };
    
    toneAnalyzer.tone(toneParams)
        .then(toneAnalysis => {
            res.send(JSON.stringify(toneAnalysis, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
})

app.listen(PORT,HOST, () => { 
    console.log(`Server listening on port ${PORT} and host ${HOST}`); 
})