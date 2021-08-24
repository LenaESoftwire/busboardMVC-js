class Postcode{
	constructor(postcode) {
		this.postcode = postcode;
	}

    showPostcode() {
		return this.postcode; 
	};
};

// class Coordinates{
//     constructor(coordinates) {
//         this.latitude = coordinates[0],
//         this.longitude = coordinates[1]
//     }

//     showCoordinates() {
//         console.log("being called");
//         return [this.latitude, this.longitude];
//     }
// }

module.exports = Postcode;
// module.exports = Coordinates;