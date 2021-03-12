const https = require('https');

exports.getAllUsers = (req, res) => {

    https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
        console.log("salut = "+res);
    });

    res.send
    response.success(res, {message: "data"})
}
