const https = require('https');
const fs = require('fs');
const path = require('path');
// make a https request

module.exports.make_request = async (req, res) => {
    let options = {
        // key: fs.readFileSync(path.join(__dirname, "..", "..", "ftpapi", "Certificate", "cert", "localhost", "localhost.decrypted.key")).toString(),
        // cert: fs.readFileSync(path.join(__dirname, "..", "..", "ftpapi", "Certificate", "cert", "localhost", "localhost.crt")).toString(),
        ca:[fs.readFileSync(path.join(__dirname, "..", "..", "ftpapi", "Certificate", "cert", "CA.pem")).toString() ],
        host: 'localhost',
        port: 9103,
        path:"/AGRT/2022_01_01_03",
        method: 'GET',
        
        
    }
    options.agent = new https.Agent(options);
    const request = https.request(options, (response) => {
        console.log(`statusCode on request: ${response.statusCode}`);
        let data = '';
        response.on('data', (d) => {
            data += d;
        });
        response.on('end', () => {
            res.send(data);
            return;
        });
    });
    request.on('error', (error) => {
        console.error(error);
        res.status(400).send("error");
    }
    );
    request.end();
    
    
}