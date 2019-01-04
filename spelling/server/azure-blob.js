const Duplex = require('stream').Duplex;
const storage = require('azure-storage');

const BlobConnectionString = 'DefaultEndpointsProtocol=https;AccountName=codefun;AccountKey=gLVBpnB4huB1lwGUclhXsKdO4y1YAF4i22XrTHYopSPZ5xsee0C6XFWIEpP/72PT6YFISfFIE7BUjff3tPEyZA==;EndpointSuffix=core.windows.net';
const SpellingBlobContainer = 'spelling';
const BufSize = 128 * 1024;

const blobService = storage.createBlobService(BlobConnectionString);

async function blobExist(blobName) {
    return new Promise(function (resolve, reject) {
        blobService.doesBlobExist(SpellingBlobContainer, `${blobName}.mp3`, (err, result) => {
            console.log(`RESULT: ${result.exists}`);
            if (err) {
                reject(err);
            }

            if (result) {
                resolve(result.exists);
            }

            reject(new Error('none of error or result returnes'));
        });
    });
}

async function putBlob(stream, blobName) {
    let bufList = [];

    return new Promise(function (resolve, reject) {
        stream.on('data', (chunk) => {
            bufList.push(chunk);
        })

        stream.on('end', () => {
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
                })
        })
    })
}

module.exports = {
    wordAudioExist: blobExist,
    addAudio: putBlob
}