class BusStop {
    constructor(postcode, naptanId, commonName, stopLetter, modes, buses) {
        this.postcode = postcode,
            this.busStopNaptan = naptanId,
            this.commonName = commonName,
            this.stopLetter = stopLetter,
            this.modes = modes,
            this.buses = buses
    }

    showPostCode() {
        return `${this.postcode}`;
    }

    showBusStopName() {
        return `busstop ${this.commonName} ${this.stopLetter}`;
    }
};

module.exports = BusStop;