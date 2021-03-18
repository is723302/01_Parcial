require("dotenv").config();
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

//Pass IAM credentials to gain access to API
const toneAnalyzer = new ToneAnalyzerV3({
  version: process.env.TONE_ANALYZER_VERSION,
  authenticator: new IamAuthenticator({
    apikey: process.env.TONE_ANALYZER_API_KEY,
  }),
  serviceUrl: process.env.TONE_ANALYZER_URL,
});

//Text to pass to API
const text = 'Team, I know that times are tough! Product '
  + 'sales have been disappointing for the past three '
  + 'quarters. We have a competitive product, but we '
  + 'need to do a better job of selling it!';

//Object to send to API and return JSON file
const toneParams = {
  toneInput: { 'text': text },
  contentType: 'application/json',
};

toneAnalyzer.tone(toneParams)
  .then(toneAnalysis => {
    console.log(JSON.stringify(toneAnalysis, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });