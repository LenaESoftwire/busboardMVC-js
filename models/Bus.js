class Bus{
    constructor( lineId, destination, timeToStation) {
        this.lineId = lineId,
        this.destination = destination,
        this.timeToStation = timeToStation
        this.buses = [];
    }

    showBus() {
        return `Bus N${this.lineId} going to ${this.destination} arrives in ${parseInt(this.timeToStation/60)} minutes`
    }
}
module.exports = Bus;