const https = require("https");
const fs = require("fs");
const http = require("http");
const env = require("./env.js");

const subscriptionKey = env.getEnvVar(env.CognitiveServiceKey);
const tokenUri =
  "https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken";
const EightMinutesMilliSeconds = 1000 * 60 * 8;
const MaxWaitNumber = 5;

var sessionToken = "";
var sesstionTokenTimeStamp = 0;
var tokenLock = false;

async function waitTime(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

async function getToken() {
  return new Promise(async function(resolve, reject) {
    let waitNumber = MaxWaitNumber;
    while (tokenLock) {
      await waitTime((MaxWaitNumber - waitNumber + 1) * 200);
      if (waitNumber == 0) {
        return reject(new Error());
      }

      waitNumber--;
    }

    tokenLock = true;
    let currentTime = Date.now();
    if (
      sessionToken.length != 0 &&
      currentTime - sesstionTokenTimeStamp < EightMinutesMilliSeconds
    ) {
      tokenLock = false;
      return resolve(sessionToken);
    }

    sessionToken = '';
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
        sesstionTokenTimeStamp = currentTime;
        resolve(sessionToken);
        tokenLock = false;
      });
    });

    request.on("error", e => {
      reject(e);
      tokenLock = false;
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
          reject(
            new Error(
              `Failed to get audio data, status code: ${res.statusCode}`
            )
          );
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
      .then(val => {
        return t2s(val, word);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
};
