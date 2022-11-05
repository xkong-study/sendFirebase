const fs = require('fs');
const axios = require('axios');
const listUsers = async () => {
    try {
        const res = await axios.get('https://data.smartdublin.ie/mobybikes-openapi.json');
        const data=JSON.stringify(res.data.components.schemas.Bike.properties);
//         console.log(res.data.components.schemas.Bike.properties);
        fs.writeFile('user.json', data, (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
    } catch (err) {
        console.error(err);
    }
};
listUsers();


var admin = require("firebase-admin");
const uuid = require('uuid-v4');

// CHANGE: The path to your service account
var serviceAccount = require("./urban-computing-cb07c-firebase-adminsdk-cddsw-c3cfcc8309.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://urban-computing-cb07c.appspot.com"
});

var bucket = admin.storage().bucket();

var filename = "./user.json"

async function uploadFile() {

  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuid()
    },
    contentType: 'application/ json',
    cacheControl: 'public, max-age=31536000',
  };

  // Uploads a local file to the bucket
  await bucket.upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    metadata: metadata,
  });

console.log(`${filename} uploaded.`);
}

uploadFile().catch(console.error);
