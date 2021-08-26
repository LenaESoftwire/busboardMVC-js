const BusStop = require('../models/BusStop');
const Coordinates = require('../models/Coordinates');
const Bus = require('../models/Bus');
const fetch = require('node-fetch');

exports.getBusStops = async (req, res) => {

    try {
        let coordinates = await getCoordinatesByPostcode(req.params.postcode);
        console.log(coordinates);
        let stops = await getNearestBusStops(req.params.postcode, coordinates);
        console.log(`stops: ${stops}`);
        let buses1 = await getBuses(stops[0].busStopNaptan);
        // stops.forEach((stop) => {
        //     await getBuses(stop.naptanId)
        // });

        // if (data["error"] == "Invalid postcode") {
        //     res.render('errorView', {
        //         data: data["error"],
        //     });
        // }
        // console.log(`lat ${data.latitude} lon ${data.longitude}`);

        res.render('busStopView', {
            data: stops, buses1
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

async function getNearestBusStops(postcode, coordinates) {

    let busStops = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${coordinates.latitude}&lon=${coordinates.longitude}&stopTypes=NaptanPublicBusCoachTram&radius=1000`)
        .then(data => data.json())
        .then(data => data["stopPoints"]
            .filter(a => a.modes.includes('bus'))
            .slice(0, 2));

    let stops = [];
    for (let i = 0; i < 2; i++) {
        stops.push(new BusStop(postcode, busStops[i]["naptanId"], busStops[i]["commonName"], busStops[i]["stopLetter"], busStops[i]["modes"] ));
    }

    console.log(stops);
    return stops;
}

async function getBuses(busStopNaptanId) {
    let buses = await fetch(`https://api.tfl.gov.uk/StopPoint/${busStopNaptanId}/Arrivals`)
        .then(data => data.json());
    
        // .then(data => {
        //     data.sort()
        //     .sort((bus1, bus2) => bus1['timeToStation'] - bus2['timeToStation'])
        //         .slice(0, 5);
        // });
    console.log(buses);

    let busList = [];
    for (let i = 0; i < 5; i++) {
        let thisbus = buses[i];
        let bus = new Bus(
            thisbus["lineId"], thisbus["towards"], thisbus["timeToStation"]);
        busList.push(bus);
    }
    console.log(busList);

    return busList;
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