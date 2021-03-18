const express = require('express')
const app = express();

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || "0.0.0.0"

const router = require('./src/routes')

app.get('/', function (req, res) {
    res.send('Hello World!');
  });

app.use(router)

app.listen(PORT,HOST, () => { 
    console.log(`Server listening on port ${PORT} and host ${HOST}`); 
})