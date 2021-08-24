const BusStop = require('../models/Postcode');
const fetch = require('node-fetch');

exports.getPostcode = (req, res) => {
    // res.send(req.params)
    let data = [
        new BusStop('NW22QA'),
        new BusStop('N200UA'),
        new BusStop(req.params.postcode)
    ];
    // let data = getCoordinatesByPostcode(req.params.postcode)
    res.render('busStopView', {
        data: data,
    });
};

async function getCoordinatesByPostcode(postcode) {

    console.log(`called with ${postcode}`);

    const response = fetch(`http://api.postcodes.io/Postcodes/${postcode}`)
        .then(data => data.json)
        .then(console.log(data));

        // while (response["error"] == "Invalid postcode") {
        //     console.log(`Error: ${response["error"]}. Please try again. \n The postcode you entered was: "${postcode}".`)
        //     return await getCoordinates(postcode);
        // }
        if (response["error"] == "Invalid postcode") {
            return response["error"];
        }
    
        return [response["result"]["latitude"], response["result"]["longitude"]]; 
};