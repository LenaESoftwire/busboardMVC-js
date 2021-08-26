class Bus{
    constructor( lineId, destination, timeToStation) {
        // this.stop = stop,
        this.lineId = lineId,
        this.destination = destination,
        this.timeToStation = timeToStation
        // 
        // this.buses = buses
    }

    showBus() {
        return `bus N${this.lineId} going to ${this.destination} arrives in ${this.timeToStation/60} minutes`
    }
}
module.exports = Bus;