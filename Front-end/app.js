const express = require('express')
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || "0.0.0.0"

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'src/html/index.html'));
  });


app.listen(PORT,HOST, () => { 
    console.log(`Server listening on port ${PORT} and host ${HOST}`); 
})