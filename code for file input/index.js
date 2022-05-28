const axios = require('axios');
const fs = require('fs');
const https = require('https');

const agent = new https.Agent({  
    rejectUnauthorized: false
});

//the api needs a type of measurement and a datetime in this specific form: YYYY_MM_DD_HH, e.g. AGRT/2022_01_01_01
let datetime = '2022_01_02_23'//change date and time at chosen intervals
let requests = [
    'https://localhost:9103/AGRT/'+datetime,
    'https://localhost:9103/ATL/'+datetime,
    'https://localhost:9103/FF/'+datetime
];

Promise.all(requests.map((request) => axios.get(request,{ httpsAgent: agent }))).then(
    axios.spread((...response) => {
      return response;
    })
  ).then(response => {
    fs.writeFileSync('./'+ response[0].headers['content-disposition'].match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, ""), response[0].data);
    fs.writeFileSync('./'+ response[1].headers['content-disposition'].match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, ""), response[1].data);
    fs.writeFileSync('./'+ response[2].headers['content-disposition'].match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, ""), response[2].data);
  });

//for single requests this can be used

// axios.get('https://localhost:9103/AGRT/2022_01_02_23', { httpsAgent: agent }).then(response => {
//     try {
//         fs.writeFileSync('./'+ response.headers['content-disposition'].match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, ""), response.data);
//       } catch (err) {
//         console.error(err);
//       }
// })
// can also be made async for more than one request at a time, check https://nodejs.dev/learn/writing-files-with-nodejs

