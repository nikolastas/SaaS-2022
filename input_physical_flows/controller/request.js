const aws = require('aws-sdk'); 

const path = require('path');

const fs = require('fs');
const https = require('https');
const dot = require("dotenv");
dot.config();
const add_csv_to_db = require('../controller/add');

const kafka_producer = require('../kafka/producer.js');
const con = require("../utils/database.js");
const make_query_function = require('../modules/make_query');





aws.config.update({
    secretAccessKey:process.env.SECRET_ACCESS_KEY,
    accessKeyId:process.env.ACCESS_KEY,
    region:process.env.REGION
})

const BUCKET = process.env.BUCKET;

const s3 = new aws.S3();
    

function getdata(datetime){
    // let datetime = "2022_01_02_23";
    // let request = 'https://localhost:9103/FF/'+datetime;

    // return new Promise(async function (resolve, rejects){

    //   axios.get(request, { httpsAgent: agent })
    //   .then(response => {
    //     let p = path.join(__dirname, "..", "data");
    //     p = p.replaceAll('\\', '/');
    //     fs.writeFileSync(p+'/physicalflows/'+ response.headers['content-disposition'].match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, ""), response.data);
    //     console.log("Got files for datetime " + datetime);
    //     resolve (response);
    //     }).catch(error => {
    //         console.log(error);
        
    //   });
    // });
    try{
        let file = datetime+"_PhysicalFlows12.1.G.csv";
        let params ={
            Bucket: BUCKET,
            Key: file
        }
        let file2= datetime+"_PhysicalFlows12.1.G.csv";
    
        return new Promise((resolve, reject) => {
            // create read stream for object
            // console.log(config.BUCKET);
            let stream = s3.getObject({Bucket: process.env.BUCKET, Key: file}).createReadStream();
            let p = path.join(path.join(__dirname, "..", "data","physicalflows", file));
            p = p.replaceAll('\\', '/');
            console.log(p);
            var fileStream = fs.createWriteStream(p);
            stream.pipe(fileStream);
            
            // on error reject the Promise
            stream.on('error', (err) => reject(new Error(err)));
            
            // on end resolve the Promise
            stream.on('end', () => {
            let kkk = fs.readFileSync(p);
            console.log(kkk);
            resolve()});
          });
    }
    catch(e){
        console.log(e);
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const freq = 1000*60/4;//15 sec
// const freq = 500;//500 ms for debugging
async function make_request(){

    let hh = 0;
    let prev_hh = 0;
    let thekey = 0;
    let modifydatetime = "";
    let prev_datetime = new Date("January 01, 2022 12:00:00");
    const datetime = new Date("January 01, 2022 12:00:00");
    
    while(1){
        
        // console.log(datetime.toISOString().split('T')[0].replaceAll('-','_') + "_" + ("0" + hh).slice(-2));
        try{
            let datetime_formated = datetime.toISOString().split('T')[0].replaceAll('-','_') + "_" + ("0" + hh).slice(-2);
            if( hh == 0){
                prev_hh = 23;
                // get previuous day of datetime
                prev_datetime = new Date(datetime.getTime() - 24*60*60*1000);
            }
            else{
                prev_datetime = datetime;
                prev_hh = hh-1;
            }
            modifydatetime = prev_datetime.toISOString().split('T')[0] + " " + ("0" + prev_hh).slice(-2);
            await getdata(datetime_formated);
            if(hh === 23){
                hh = 0;
                
                datetime.setDate(datetime.getDate() + 1);
            }
            else{
                
                hh++;
            }

            let file = datetime_formated+"_"+"PhysicalFlows12.1.G.csv";
            let folder = "physicalflows"
            
            // folder = folders[files.indexOf(f)];
            // let file = datetime_formated+"_"+f;
            console.log("Checking file " + file + " in folder " + folder);
            let result_from_add = await add_csv_to_db.upload_csv(folder, file);
            // console.log(result_from_add)
            
            //kafka message
            thekey++;
            
            kafka_producer("data_input_physical","DATA READY : " + modifydatetime ,thekey);
            
            await timeout(freq);
            // if prev and curr datetime are on different months, then wait for next month
            if(prev_datetime.getMonth() != datetime.getMonth()){
                try{
                    await make_query_function(con, "truncate table "+ folder+";");
                    // con.end();
                    console.log("i truncated table " + folder+ " because the month changed");
                    
                }catch(err){
                    console.log(err);
                    console.log("Error: cannot truncate table "+folder);
                }
            }  
        }
        catch(error){
            console.log("something went wrong");
            console.log(error);
            await timeout(freq);
        }
        
    }
}
module.exports.make_request = async (req,res) =>{
    make_request();
    // res.send("Request started");
}
// make_request();

//the api needs a type of measurement and a datetime in this specific form: YYYY_MM_DD_HH, e.g. AGRT/2022_01_01_01
// let datetime = '2022_01_02_23'//change date and time at chosen intervals
