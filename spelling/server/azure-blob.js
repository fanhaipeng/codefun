module.exports = {
  addAudio: addAudio,
  addWordsList: addWordsList,
  getWordsLists: getWordsLists
};

const Duplex = require("stream").Duplex;
const storage = require("azure-storage");
const tts = require("./tts.js");

const BlobConnectionString =
  "DefaultEndpointsProtocol=https;AccountName=codefun;AccountKey=gLVBpnB4huB1lwGUclhXsKdO4y1YAF4i22XrTHYopSPZ5xsee0C6XFWIEpP/72PT6YFISfFIE7BUjff3tPEyZA==;EndpointSuffix=core.windows.net";
const SpellingBlobContainer = "spelling";
const WordListBlobcontainer = "wordlist";

const blobService = storage.createBlobService(BlobConnectionString);

async function blobExists(container, blobName) {
  return new Promise(function(resolve, reject) {
    blobService.doesBlobExist(container, blobName, (err, result) => {
      if (err) {
        reject(err);
      }

      if (result) {
        resolve(result.exists);
      }

      reject(new Error("none of error or result returnes"));
    });
  });
}

async function addAudio(stream, blobName) {
  let bufList = [];

  return new Promise(function(resolve, reject) {
    stream.on("data", chunk => {
      bufList.push(chunk);
    });

    stream.on("end", () => {
      let memStream = new Duplex();
      memStream.push(Buffer.concat(bufList));
      memStream.push(null);

      blobService.createBlockBlobFromStream(
        SpellingBlobContainer,
        `${blobName}.mp3`,
        memStream,
        memStream.readableLength,
        (err, result) => {
          if (err) {
            reject(err);
          }

          if (result) {
            resolve(result.name);
          }

          reject(new Error("None of error or result returns"));
        }
      );
    });
  });
}

async function getWordsLists() {
  return new Promise((resolve, reject) => {
    blobService.listBlobsSegmented(
      WordListBlobcontainer,
      null,
      (err, listResult) => {
        if (err) {
          return reject(err);
        }

        if (listResult) {
          resolve(
            listResult.entries.map(result => {
              return result.name;
            })
          );
        }

        reject(new Error("None of error or result returns"));
      }
    );
  });
}

async function addWordsList(wordList) {
  return new Promise((resolve, reject) => {
    if (!wordList || !wordList.name || !Array.isArray(wordList.list)) {
      return reject(
        new Error("A word list must have a name and an array of words")
      );
    }

    blobExists(WordListBlobcontainer, wordList.name)
      .then(exist => {
        if (exist) {
          return reject(new Error(`Word list '${wordList.name}' is existing.`));
        } else {
          return Promise.all(
            wordList.list.map(word => {
              let blobName = `${word}.mp3`;
              blobExists(SpellingBlobContainer, blobName).then(exists => {
                if (exists) {
                  return Promise.resolve(blobName);
                } else {
                  return tts.text2speech(word).then(stream => {
                    return addAudio(stream, word);
                  });
                }
              });
            })
          );
        }
      })
      .then(values => {
        let blobContent = wordList.list.join();
        blobService.createBlockBlobFromText(
          WordListBlobcontainer,
          wordList.name,
          blobContent,
          (err, result) => {
            if (err) {
              reject(err);
            }

            if (result) {
              resolve(result.name);
            }
          }
        );
      })
      .catch(err => {
        reject(err);
      });
  });
}

async function getWordList(listName) {
  return new Promise((resolve, reject) => {
    if (!listName) {
      return reject(new Error("listName must be specified"));
    }

    blobService.getBlobToText(
      WordListBlobcontainer,
      listName,
      (err, result) => {
        if (err) {
          reject(err);
        }

        if (result) {
          return {
            name: listName,
            list: result.split(",")
          };
        }
      }
    );
  });
}
