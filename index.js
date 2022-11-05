const fs = require('fs');
const axios = require('axios');

const listUsers = async () => {
    try {
        const res = await axios.get('https://data.smartdublin.ie/mobybikes-openapi.json');
        const data=JSON.stringify(res.data.components.schemas.Bike.properties);
        console.log(res.data.components.schemas.Bike.properties);
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
const intervalID = setInterval(listUsers, 2000);

var admin = require("firebase-admin");
const uuid = require('uuid-v4');

// CHANGE: The path to your service account
var serviceAccount = require("./urban-computing-cb07c-firebase-adminsdk-cddsw-f955b71cf5.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://urban-computing-cb07c.appspot.com"
});

var bucket = admin.storage().bucket();

var filename = "./user.json"

setInterval(()=>{
 function uploadFile() {

  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuid()
    },
    contentType: 'application/ json',
    cacheControl: 'public, max-age=31536000',
  };
     bucket.upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    metadata: metadata,
  })
}
console.log(`${filename} uploaded.`);
},2200);

