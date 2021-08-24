const BusStop = require('../models/BusStop');

exports.getPostcode = (req, res) => {
	let data = [
		new BusStop('NW22QA'),
		new BusStop('N200UA')
	];
	res.render('busStopView', {
		data : data,
	});
};