class BusStop{
    constructor(postcode, busstop) {
        this.postcode = postcode,
        this.busStopNaptan = busstop
    }

    showPostCode() {
        return `${this.postcode}`;
    }

    showBusStop() {
        return `busStopNaptan: ${this.busStopNaptan}`;
    }
};

module.exports = BusStop;