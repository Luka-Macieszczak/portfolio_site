var http = require('http');
var express = require('express');
var path = require('path');

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(PORT, () => {
    console.log('app listening on port: ', PORT)
})