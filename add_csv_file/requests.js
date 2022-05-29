const https = require('https');
const fs = require('fs');
const path = require('path');
options = {
    host: 'localhost',
    port: '9103',
    path: '/AGRT/2022_01_01_03',
    method: 'GET',
    key: fs.readFileSync(path.join(__dirname, '..', 'ftpapi','Certificate', 'CA', 'localhost', 'localhost.decrypted.key')),
    cert: fs.readFileSync(path.join(__dirname, '..','ftpapi', 'Certificate', 'CA', 'localhost', 'localhost.crt'))
    // ca: fs.readFileSync(path.join(__dirname, '..','ftpapi', 'Certificate', 'CA', 'localhost', 'ca.crt'))
};

// https certificate
// var options = {
//     key: fs.readFileSync(path.join(__dirname, '\\Certificate\\CA\\localhost\\localhost.decrypted.key')),
//     cert: fs.readFileSync(path.join(__dirname, '.\\Certificate\\CA\\localhost\\localhost.crt'))
// };

const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
}
);
