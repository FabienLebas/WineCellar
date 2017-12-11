const request = require("request");
const fs = require("fs");

const Google_Cloud_Api_Key = process.env.Google_Cloud_Api_Key;
const url = "https://vision.googleapis.com/v1/images:annotate?key=" + Google_Cloud_Api_Key;

const filesToSend = ["images/jusOrange.JPG", "images/margauxArriere.JPG", "images/margauxDevant.JPG", "images/oeufs.JPG", "images/sauternesArriere.JPG", "images/sauternesDevant.JPG", "images/yaourts.JPG"];

function getBase64fromFile(path){
  const imageFile = fs.readFileSync(path);
  return new Buffer(imageFile).toString('base64');
}

function askForTextDetection(path, callback){
  request(
    {
      url: "https://vision.googleapis.com/v1/images:annotate?key=" + Google_Cloud_Api_Key,
      method: "POST",
      body: JSON.stringify(
        {requests:[{
          image:{content: getBase64fromFile(path)},
          features: [{
            type: "TEXT_DETECTION",
            maxResults: 1
          }]
        }]}
      )
    },
    function(error, response, result) {
      if (error){
        console.log("error:", error); // Print the error if one occurred
      } else {
        callback(path + ".json", result);
      }
    }
  );
}

filesToSend.forEach((path) => {askForTextDetection(path, fs.writeFileSync)});
