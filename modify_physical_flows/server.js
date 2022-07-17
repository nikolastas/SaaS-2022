const app = require('./app.js');
const dot = require('dotenv');
dot.config();


var port =  process.env.PORT || 7775 ;
console.log(port);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`go to http://localhost:${port}/`);
});