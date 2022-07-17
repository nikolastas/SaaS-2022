const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.clientID);
const parseJwt = require('../modules/decodeToken')

/**
 * @name verify
 * @description verifies the validity of the users info
 * @param {string} token the response token of the SSO Login Service
 */
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.clientID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
}

let cnt = 0;

setInterval(() => {
    console.log("Verifications: " + cnt)
}, 600000)

module.exports = function verifyUser(req, res, next) {

    let tokenHeader = req.get('authentication')
    // res.set('authentication', tokenHeader);

    // console.log(tokenHeader);
    cnt += 1;
    let data = parseJwt(tokenHeader);

    if (tokenHeader == null) return res.status(401).send();

    else {

        verify(tokenHeader)
            .then(() => {
                // console.log("Verified :"+data.name + new Date())

                req.body.name = data.name;
                req.body.email = data.email;
                req.body.userID = data.sub;
                req.body.token = tokenHeader;
                // console.log(req.body.sublength);
                // if(req.body.sublength !== undefined)
                //     next.body.sublength = req.body.sublength;
                next()
            })
            .catch((e) => {
                console.error(e);
                return res.status(403).send({log: "Token is invalid"});
            });
    }
}