const express = require("express");
const blob = require("./azure-blob");
const bodyParser = require("body-parser");
const path = require("path");

const appDistPath = `${__dirname}${path.sep}..${path.sep}app${path.sep}dist${
  path.sep
}`;
console.log(`DIST PATH: ${appDistPath}`);
var app = express();
app.use(bodyParser.text());
app.use(express.static(appDistPath));

app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: appDistPath
  });
});

app.get("/wordlists", getWordLists);
app.put("/wordlist/:listname", addWordList);
app.listen(process.env.PORT || 8000);

function addWordList(req, res) {
  let dataLoad = "";
  req.on("data", chunk => {
    dataLoad += chunk;
  });

  req.on("end", () => {
    let data = {
      name: req.params.listname,
      list: dataLoad.split(/\n|\r\n/gm)
    };
    blob
      .addWordsList(data)
      .then(result => {
        res.status(201).end();
      })
      .catch(err => {
        res.status(500).send("Something went wrong, error: " + err);
      });
  });
}

function getWordLists(req, res) {
  blob
    .getWordsLists()
    .then(lists => {
      res.json(lists);
    })
    .catch(err => {
      res.sendStatus(500).send("Something went wrong, error: " + err);
    });
}
