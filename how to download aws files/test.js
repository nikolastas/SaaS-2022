require("dotenv").config();
const aws = require('aws-sdk'); 

const fs = require('fs');
const path = require("path");

aws.config.update({
  secretAccessKey:process.env.SECRET_ACCESS_KEY,
  accessKeyId:process.env.ACCESS_KEY,
  region:process.env.REGION
})

const BUCKET = process.env.BUCKET;

const s3 = new aws.S3();

async function getObjectStreamSync(params, dest) {
  return new Promise((resolve, reject) => {
    // create read stream for object
    let stream = s3.getObject(params).createReadStream();
    
    var fileStream = fs.createWriteStream(dest);
    stream.pipe(fileStream);
    
    // on error reject the Promise
    stream.on('error', (err) => reject(new Error(err)));
    
    // on end resolve the Promise
    stream.on('end', () => resolve());
  });
}

async function getfile( theparams, thedir){
  await getObjectStreamSync(theparams, thedir);
  console.log("done! ", theparams.Key) ;
}

const myparams = {
  Bucket: BUCKET,
  Key: "2022_01_01_04_PhysicalFlows12.1.G.csv"//some KB
  // Key:  "2022_01_10_09_AggregatedGenerationPerType16.1.BC.csv" //~=40MB
}

getfile(myparams, path.join(__dirname, myparams.Key));

