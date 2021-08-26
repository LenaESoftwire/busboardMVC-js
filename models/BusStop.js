class BusStop{
    constructor(postcode, naptanId, commonName, stopLetter, modes) {
        this.postcode = postcode,
        this.busStopNaptan = naptanId,
        this.commonName = commonName,
        this.stopLetter = stopLetter,
        this.modes = modes
        // 
        // this.buses = buses
    }

    showPostCode() {
        return `${this.postcode}`;
    }

    showBusStop() {
        return `busStopNaptan: ${this.busStopNaptan}`;
    }

    showBusStopName() {
        return `busstop ${this.commonName} ${this.stopLetter}`;
    }

    show
};

module.exports = BusStop;