const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.sendFile('index.html', { root : __dirname })
})

app.listen(process.env.PORT || 8888);