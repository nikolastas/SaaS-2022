
const fs = require('fs');

const generateDeltaFile = (pathToBaseFile, pathToFileForComparison, pathForOutputFileName = './difference.csv') => {
    let baseFileContent = '', secondaryFileContent = '', changedLine = ''
    return new Promise((resolve, reject) => {
        const baseFileReadstream = fs.createReadStream(pathToBaseFile)
        baseFileReadstream
        .on('data', chunk => { baseFileContent = baseFileContent + chunk })
        .on('error', (err) => reject(err))
        .on('end', () => {
            const secondaryFileReadstream = fs.createReadStream(pathToFileForComparison)
            secondaryFileReadstream
                .on('data', data => { secondaryFileContent = secondaryFileContent + data })
                .on('error', (err) => reject(err))
                .on('end', () => {
                    // split all lines by \n to form an array for both base and secondary files
                    const internLines = baseFileContent.toString().split('\n');
                    const externLines = secondaryFileContent.toString().split('\n');

                    // Create a json object with each secondary file line as its key and value as true
                    const externLookup = {};
                    // get the headers
                    const headers = internLines[0];
                    changedLine = headers + '\n';
                    externLines.forEach(eLine => externLookup[eLine] = true);

                    // Iterate through each line of base file
                    internLines.forEach(iLine => {
                        // use above formed json object and pass each line as key
                        // value of externLookup[iLine] would be undefined if secondary file didn't have same line
                        // in that case current line is considered as changed line and will be eventually written to output file

                        if (!externLookup[iLine]) changedLine = changedLine + iLine + '\n'
                    })
                    // console.log(changedLine)
                    fs.writeFileSync(pathForOutputFileName, changedLine)
                    resolve('DONE')
                })
})
})
}
module.exports = generateDeltaFile(baseFilePath, secondaryFilePath, outputFilePath);