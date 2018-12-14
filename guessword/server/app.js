var path = require('path');
var express = require('express');
var app = express();
var wordslist = require('./wordslist.js');

var rootPath = __dirname + path.sep + '..' + path.sep;
app.use(express.static(rootPath));

app.get('/', function(req, res){
    res.sendFile('index.html', {root: rootPath}, function(err){
        console.error(err);
    });
});

app.get('/next', function(req, res){
    let nextWord = wordslist[Math.floor(Math.random() * wordslist.length)]
    res.send(nextWord);
    res.end();
});

app.get('index.js', function(req, res){
    res.sendFile('index.js', {root : rootPath}, function(err){
        console.error(err);
    });
})

app.listen(3000);