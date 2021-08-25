const BusStop = require('../models/Postcode');
const Coordinates = require('../models/Coordinates');
const fetch = require('node-fetch');

exports.getPostcode = (req, res) => {
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

exports.getCoordinates = async (req, res) => {

    try {


        let data = await getCoordinatesByPostcode(req.params.postcode);

        console.log(`lat ${data.latitude} lon ${data.longitude}`);
        // let data = getCoordinatesByPostcode(req.params.postcode)
        res.render('busStopView', {
            data: data,
        });
    } catch (e) {
        res.status(500).json({
            status: false,
            error: e.message
        })
    }
};

async function getCoordinatesByPostcode(postcode) {

    console.log(`called with ${postcode}`);

    let data = await fetch(`http://api.postcodes.io/Postcodes/${postcode}`)
        .then(result => result.json());
    console.log(`response ${data["result"]["latitude"]}`);

    console.log(`response json ${data["result"]["longitude"]}`);
   
    return new Coordinates([data["result"]["latitude"], data["result"]["longitude"]])



    // while (data["error"] == "Invalid postcode") {
    //     console.log(`Error: ${data["error"]}. Please try again. \n The postcode you entered was: "${postcode}".`)
    //     return await getCoordinates(postcode);
    // }
    // if (data["error"] == "Invalid postcode") {
    //     return data["error"];
    // }

    // return data;
};