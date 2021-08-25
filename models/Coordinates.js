class Coordinates{
    constructor(coordinates) {
        this.latitude = coordinates[0],
        this.longitude = coordinates[1]
    }

    showCoordinates() {
        return `latitude: ${this.latitude}, longitude: ${this.longitude}`;
    }
};

module.exports = Coordinates;