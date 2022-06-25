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


const agent = new https.Agent({  
    ca:[fs.readFileSync(path.join(__dirname, "CA.pem")).toString() ]
});

function getdata(datetime){
    // let datetime = "2022_01_02_23";
    let requests = [
        'https://localhost:9103/AGRT/'+datetime,
        'https://localhost:9103/ATL/'+datetime,
        'https://localhost:9103/FF/'+datetime
    ];

    return new Promise(async function (resolve, rejects){
        Promise.all(requests.map((request) => axios.get(request,{ httpsAgent: agent }))).then(
        axios.spread((...response) => {
          return response;
        })
      ).then(response => {
        let p = path.join(__dirname, "..", "data");
        p = p.replaceAll('\\', '/')
        fs.writeFileSync(p+"/aggrgenerationpertype/"+ response[0].headers['content-disposition'].match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, ""), response[0].data);
        fs.writeFileSync(p+'/actualtotalload/'+ response[1].headers['content-disposition'].match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, ""), response[1].data);
        fs.writeFileSync(p+'/physicalflows/'+ response[2].headers['content-disposition'].match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, ""), response[2].data);
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
    const datetime = new Date("January 01, 2022 12:00:00");

    while(1){
        // console.log(datetime.toISOString().split('T')[0].replaceAll('-','_') + "_" + ("0" + hh).slice(-2));
        try{
            let datetime_formated = datetime.toISOString().split('T')[0].replaceAll('-','_') + "_" + ("0" + hh).slice(-2);
            await getdata(datetime_formated);
            if(hh === 23){
                hh = 0;
                datetime.setDate(datetime.getDate() + 1);
            }
            else{
                hh++;
            }

            let files = [ "PhysicalFlows12.1.G.csv", "ActualTotalLoad6.1.A.csv", "AggregatedGenerationPerType16.1.BC.csv"]
            let folders = ["physicalflows","actualtotalload","aggrgenerationpertype"] 
            for(f of files ){
                    folder = folders[files.indexOf(f)];
                    let file = datetime_formated+"_"+f;
                    console.log("Checking file " + file + " in folder " + folder);
                    let result_from_add = await add_csv_to_db.upload_csv(folder, file);
                    // console.log(result_from_add)
                
            }

            await timeout(freq);
        }
        catch{
            console.log("something went wrong");
            await timeout(freq);
        }
        
    }
}
module.exports.make_request = async (req,res) =>{
    make_request();
    res.send("Request started");
}
// make_request();

//the api needs a type of measurement and a datetime in this specific form: YYYY_MM_DD_HH, e.g. AGRT/2022_01_01_01
// let datetime = '2022_01_02_23'//change date and time at chosen intervals


//for single requests this can be used

// axios.get('https://localhost:9103/AGRT/2022_01_02_23', { httpsAgent: agent }).then(response => {
//     try {
//         fs.writeFileSync('./'+ response.headers['content-disposition'].match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, ""), response.data);
//       } catch (err) {
//         console.error(err);
//       }
// })
// can also be made async for more than one request at a time, check https://nodejs.dev/learn/writing-files-with-nodejs