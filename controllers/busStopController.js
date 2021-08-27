const BusStop = require('../models/BusStop');
const Coordinates = require('../models/Coordinates');
const Bus = require('../models/Bus');
const Error = require('../models/Error');
const fetch = require('node-fetch');

exports.getBusStops = async (req, res) => {

    try {
        let coordinates = await getCoordinatesByPostcode(req.params.postcode);
        console.log(coordinates);
        if (coordinates.status === 404) {
            res.render('errorView', {
                data: coordinates,
            });
            return;
        }
        let stops = await getNearestBusStops(req.params.postcode, coordinates);
        console.log("stops");
        if (stops.status === 404) {
            res.render('errorView', {
                data: stops,
            });
            return;
        }
        console.log(`stops: ${stops}`);
        let buses = await getBuses(stops[0].busStopNaptan);
        stops[0].buses = buses;
        buses = await getBuses(stops[1].busStopNaptan);
        stops[1].buses = buses;

        res.render('busStopView', {
            data: stops,
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

    let data = await fetch(`http://api.postcodes.io/Postcodes/${postcode}`)
        .then(result => result.json());
    if (data["status"] == 404) {
        return new Error(data["status"], data["error"]);
    }

    return new Coordinates([data["result"]["latitude"], data["result"]["longitude"]]);
};

async function getNearestBusStops(postcode, coordinates) {

    let busStops = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${coordinates.latitude}&lon=${coordinates.longitude}&stopTypes=NaptanPublicBusCoachTram&radius=1000`)
        .then(data => data.json())
        .then(data => data["stopPoints"]
            .filter(a => a.modes.includes('bus'))
            .slice(0, 2));

    if (busStops.length == 0) {
        return new Error(404, `There are no bus stops around ${postcode}`);
    }

    let stops = [];
    for (let i = 0; i < 2; i++) {
        stops.push(new BusStop(postcode, busStops[i]["naptanId"], busStops[i]["commonName"], busStops[i]["stopLetter"], busStops[i]["modes"], []));
    }

    return stops;
}

async function getBuses(busStopNaptanId) {
    let buses = await fetch(`https://api.tfl.gov.uk/StopPoint/${busStopNaptanId}/Arrivals`)
        .then(data => data.json());

    let busList = [];
    for (let i = 0; i < buses.length; i++) {
        let thisbus = buses[i];
        let bus = new Bus(
            thisbus["lineId"], thisbus["destinationName"], thisbus["timeToStation"]);
        busList.push(bus);
    }

    busList = busList.sort((bus1, bus2) => bus1.timeToStation - bus2.timeToStation).slice(0, 5);
    console.log(busList);


    return busList;
};