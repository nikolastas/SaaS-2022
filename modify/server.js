const app = require('./app.js');


var port = 7770 ;
app.listen(process.env.port || port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`go to https://localhost:${port}/`);
});