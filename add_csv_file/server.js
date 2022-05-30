const app = require('./app.js');


var port = 6660 ;
app.listen(process.env.port || port, () => {
    console.log(`Server is running on port ${port}`);
});