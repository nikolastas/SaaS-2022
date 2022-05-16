const {OAuth2Client} = require('google-auth-library');

const clientID = "121675657166-v1sgbuen2ph1e9qs8iq8h92di7mp676f.apps.googleusercontent.com" ;
//usage: verifyUser(CLIENT_ID, token).catch(console.error)

module.exports = async function verifyUser(token) {
    let client = new OAuth2Client(clientID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log(`${userid}`); //can be removed
}

