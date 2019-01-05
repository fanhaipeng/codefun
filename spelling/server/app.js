const express = require("express")
const blob = require("./azure-blob")
const bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.text());

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/wordlists", getWordLists);
app.put('/wordlist/:listname', addWordList);
app.listen(process.env.PORT || 8000);

function addWordList(req, res){
  let data = {
    name: req.params.listname,
    list: req.body.split('\r\n')
  }

  blob.addWordsList(data)
  .then(result => {
    res.status(201).end()
  })
  .catch(err => {
    res.status(500).send('Something went wrong, error: ' + err)
  })
}

function getWordLists(req, res) {
  blob
    .getWordsLists()
    .then(lists => {
      res.send(lists);
    })
    .catch(err => {
      res.sendStatus(500).send("Something went wrong, error: " + err);
    });
}
