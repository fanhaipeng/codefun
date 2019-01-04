const express = require('express');

app = express();

app.get('/', (req, res) => {
    res.send('<h2>Spelling Test</h2>');
    res.end();
})

app.listen(process.env.PORT || 8888);