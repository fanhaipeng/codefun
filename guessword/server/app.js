var path = require('path');
var express = require('express');
var device = require('express-device');
var app = express();
var wordslist = require('./wordslist.js');

var rootPath = __dirname + path.sep + '..' + path.sep;
app.use(device.capture());
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

app.get('/main.css', function(req, res){
    let fileName = 'main-mobile.css';
    if (req.device.type === 'desktop'){
        fileName = 'main-desktop.css';
    }

    res.sendFile(fileName, {root: rootPath}, function(err){
        console.error(err);
    })
});

app.listen(process.env.PORT | 3000);