const express = require('express');
const app = express();
const testController = require('./controllers/testController');
const busStopController = require('./controllers/busStopController');


var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.get('/', testController.getTestData);
app.get('/otherData', testController.getSecondTestData);
app.get(`/postcode`, busStopController.getPostcode);

app.listen(port, () => {
	console.log(`app is listening to port ${port}`);
});