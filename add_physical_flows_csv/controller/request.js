const path = require('path');
const axios = require('axios');
const fs = require('fs');
const https = require('https');
const { PassThrough } = require('stream');
const add_csv_to_db = require('../controller/add');
const res = require('express/lib/response');
const { time } = require('console');
const { resolve } = require('path');
const { rejects } = require('assert');
const kafka_producer = require('../kafka/producer.js');


const agent = new https.Agent({  
    ca:[fs.readFileSync(path.join(__dirname, "CA.pem")).toString() ]
});


// axios.get('https://localhost:9103/AGRT/2022_01_02_23', { httpsAgent: agent }).then(response => {
//     try {
//         fs.writeFileSync('./'+ response.headers['content-disposition'].match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, ""), response.data);
//       } catch (err) {
//         console.error(err);
//       }
// })

//     Promise.all(requests.map((request) => axios.get(request,{ httpsAgent: agent }))).then(
//     axios.spread((...response) => {
//       return response;
//     })
//   )
      

function getdata(datetime){
    // let datetime = "2022_01_02_23";
    let request = 'https://localhost:9103/FF/'+datetime;

    return new Promise(async function (resolve, rejects){

      axios.get(request, { httpsAgent: agent })
      .then(response => {
        let p = path.join(__dirname, "..", "data");
        p = p.replaceAll('\\', '/');
        fs.writeFileSync(p+'/physicalflows/'+ response.headers['content-disposition'].match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, ""), response.data);
        console.log("Got files for datetime " + datetime);
        resolve (response);
        }).catch(error => {
            console.log(error);
        
      });
    });
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const freq = 1000*60/4;//15 sec
// const freq = 500;//500 ms for debugging
async function make_request(){

    let hh = 0;
    let thekey = 0;
    let modifydatetime = "";
    const datetime = new Date("January 01, 2022 12:00:00");

    while(1){
        
        // console.log(datetime.toISOString().split('T')[0].replaceAll('-','_') + "_" + ("0" + hh).slice(-2));
        try{
            let datetime_formated = datetime.toISOString().split('T')[0].replaceAll('-','_') + "_" + ("0" + hh).slice(-2);
            modifydatetime = datetime.toISOString().split('T')[0] + " " + ("0" + hh).slice(-2);
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
