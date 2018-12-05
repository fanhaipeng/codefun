var express = require('express');
var app = express();
var wordslist = require('./wordslist.js');

app.get('/', function(req, res){
    res.sendFile('index.html', {root: __dirname + '/views/'}, function(err){
        console.error(err);
    });
    res.end();
});

app.get('/next', function(req, res){
    let nextWord = wordslist[Math.floor(Math.random() * wordslist.length)]
    res.send(`<h2>${nextWord}</h2>`);
    res.end();
});

app.listen(3000);