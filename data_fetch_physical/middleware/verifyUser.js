const jwt = require("jsonwebtoken");

module.exports = function verifyUser(req, res, next) {

    let tokenHeader = req.get('authentication')
    res.set('authentication', tokenHeader);

    console.log(tokenHeader);

    const token = tokenHeader && tokenHeader.split(' ')[0];

    if (token == null) return res.status(401).send();

    jwt.verify(token, process.env.MY_SECRET_KEY, (err, data) => {

        if (err) return res.status(403).send({
            log: "Token is invalid"
        });
        console.log(data)

        req.body.user = data.username;
        req.body.email = data.email;
        req.body.userID = data.userID;
        next()
    })
}