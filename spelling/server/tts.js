const https = require("https");
const fs = require("fs");
const http = require("http");

const subscriptionKey = "4ec4d0210b214c669885bb9ac842ede9";
const tokenUri =
  "https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken";

var sessionToken;
var sesstionTokenTimeStamp = 0;
const EightMinutesMilliSeconds = 1000 * 60 * 8;
function getToken() {
  return new Promise(function(resolve, reject) {
    let currentTime = Date.now();
    if (
      sessionToken &&
      currentTime - sesstionTokenTimeStamp < EightMinutesMilliSeconds
    ) {
      return resolve(sessionToken);
    }

    let tokenRequestOptions = {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey
      }
    };

    let request = https.request(tokenUri, tokenRequestOptions, res => {
      if (res.statusCode !== 200) {
        reject(`Fail to get access token, REQUEST STATUS: ${res.statusCode}`);
      }

      res.setEncoding("utf8");
      res.on("data", chunk => {
        sessionToken += chunk;
      });

      res.on("end", () => {
        resolve(sessionToken);
      });
    });

    request.on("error", e => {
      reject(e);
    });

    request.write("");
    request.end();
  });
}

function t2s(accessToken, text) {
  return new Promise(function(resolve, reject) {
    var msgBody = `<speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='Microsoft Server Speech Text to Speech Voice (en-US, JessaRUS)'>${text}</voice></speak>`;
    let requestOptions = {
      method: "POST",
      headers: {
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
        "Content-Type": "application/ssml+xml",
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "CodeFunSpeech"
      }
    };

    let request = https.request(
      "https://westus.tts.speech.microsoft.com/cognitiveservices/v1",
      requestOptions,
      res => {
        if (res.statusCode !== 200) {
          reject(`ERROR: ${res.statusCode}`);
        } else {
          resolve(res);
        }
      }
    );

    request.on("error", err => {
      reject(err);
    });

    request.write(msgBody);
    request.end();
  });
}

module.exports = {
  text2speech: async function(word) {
    return getToken()
      .then(
        val => {
          return t2s(val, word);
        },
        err => {
          console.error(`ERROR: ${err}`);
          return Promise.reject(err);
        }
      )
      .catch(err => {
        console.error(`ERROR: ${err}`);
        return Promise.reject(err);
      });
  }
};
