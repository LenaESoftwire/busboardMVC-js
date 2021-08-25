class BusStop{
    constructor(busstop) {
        this.busStopNaptan = busstop
    }

    showBusStop() {
        return `busStopNaptan: ${this.busStopNaptan}`;
    }
};

module.exports = BusStop;