const {OAuth2Client} = require('google-auth-library');


//usage: verifyUser(CLIENT_ID, token).catch(console.error)
module.exports = async function verifyUser(CLIENT_ID, token) {
    let client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log('Token verified'); //can be removed
}

