const app = require('./app.js');
const dot = require('dotenv');
dot.config();

let port = process.env.PORT || 7771;

app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
    console.log(`go to http://localhost:${port}/`);
});