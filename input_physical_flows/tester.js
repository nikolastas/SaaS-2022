// read csv file and print data
const path = require('path');
const fs = require('fs');


function readcsv(file){
    let p = path.join(__dirname, "data", "physicalflows", file);
    p = p.replaceAll('\\', '/');
    console.log(p);
    let data = fs.readFileSync(p);
    let lines = data.toString().split('\n');
    console.log(lines);
    for(let i = 0; i < lines.length; i++){
        let line = lines[i];
        let values = line.split(',');
        console.log(values);
    }
}

readcsv("/2022_01_01_01_PhysicalFlows12.1.G.csv");
