class BusStop{
	constructor(postcode) {
		this.postcode = postcode;
	}

	showBusData() {
		return this.postcode; 
	};

	// editName(newName) {
	// 	this.name = newName
	// }
};

module.exports = BusStop;