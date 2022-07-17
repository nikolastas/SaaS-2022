const fs = require('fs');

module.exports = function (pathForReadingFile, keepCTYLines) {
    let result = '', lines = '';
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(pathForReadingFile);
        readStream
        .on('error', (err) => reject(err))
        .on('data', chunk => {
            lines = lines + chunk 
        })
        .on('end', () => {
            // send back the result
            const iLines = lines.toString().split('\n');

            const headers = iLines[0];
            result = result + headers + '\n';

            iLines.forEach(line => {
                if(!(keepCTYLines) || keepCTYLines && line.includes('CTY')) {
                    result = result + line + '\n';
                }
            })
            resolve(result)
        })
    })

}