const fs = require('fs');
const express = require('express');
const app = require('./app.js');
const con = require('./utils/database.js');
const path = require('path');
const dot = require('dotenv');
dot.config();


var port = process.env.PORT || 6660 ;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`go to https://localhost:${port}/`);
    // close con when app is closed
    process.on('SIGINT', function() {
        // delete all files in ../data/physicalflows
        const direcotry = "data/physicalflows/";
        let files = fs.readdirSync(direcotry);
        for (const file of files) {
            console.log((path.join(__dirname,direcotry, file)))
            fs.unlinkSync(path.join(__dirname,direcotry, file));
        };    
        const directory2 = "/controller/physicalflows_last.txt";
        console.log(path.join(directory2));
        fs.unlinkSync(path.join(__dirname,directory2));

        console.log('SIGINT received: closing connections');
        
        
        
        con.end();
        process.exit(0);
    }
    );
});
