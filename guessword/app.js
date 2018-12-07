var express = require('express');
var app = express();
var wordslist = require('./server/wordslist.js');

app.use(express.static(__dirname + '/css/'));

app.get('/', function(req, res){
    res.sendFile('index.html', {root: __dirname + '/'}, function(err){
        console.error(err);
    });
});

app.get('/next', function(req, res){
    let nextWord = wordslist[Math.floor(Math.random() * wordslist.length)]
    res.send(`<h2>${nextWord}</h2>`);
    res.end();
});

app.get('/path', function(req, res){
    res.send('<h2>' + __dirname + '</h2>');
});

app.get('/index.js', function(req, res){
    res.sendFile('index.js', {root : __dirname}, function(err){
        console.error(err);
    });
})

app.listen(3000);