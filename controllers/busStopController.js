const BusStop = require('../models/BusStop');
const Coordinates = require('../models/Coordinates');
const fetch = require('node-fetch');

exports.getBusStops = async (req, res) => {

    try {
        let coordinates = await getCoordinatesByPostcode(req.params.postcode);
        let data = await getNearestBusStops(coordinates);
        // if (data["error"] == "Invalid postcode") {
        //     res.render('errorView', {
        //         data: data["error"],
        //     });
        // }
        // console.log(`lat ${data.latitude} lon ${data.longitude}`);

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
exports.getCoordinates = async (req, res) => {

    try {
        let data = await getCoordinatesByPostcode(req.params.postcode);
        // if (data["error"] == "Invalid postcode") {
        //     res.render('errorView', {
        //         data: data["error"],
        //     });
        // }
        // console.log(`lat ${data.latitude} lon ${data.longitude}`);

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

    return new Coordinates([data["result"]["latitude"], data["result"]["longitude"]]);
};

async function getNearestBusStops(coordinates) {

    let busStops = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${coordinates.latitude}&lon=${coordinates.longitude}&stopTypes=NaptanPublicBusCoachTram&radius=1000`)
        .then(data => data.json())
        .then(data => data['stopPoints']
            .filter(a => a.modes.includes('bus'))
            .slice(0, 2));

    let stops = [];
    for (let i=0; i<2; i++) {
        stops.push(new BusStop(busStops[i]["naptanId"]));
    }
   
    console.log(stops);
    return stops;
}




exports.getPostcode = (req, res) => {
    let data = [
        new BusStop('NW22QA'),
        new BusStop('N200UA'),
        new BusStop(req.params.postcode)
    ];

    res.render('busStopView', {
        data: data,
    });
};