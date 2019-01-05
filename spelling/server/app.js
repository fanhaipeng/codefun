const express = require("express");
const blob = require("./azure-blob");

var app = express();

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/wordlists", getWordLists);
app.listen(process.env.PORT || 8888);

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
