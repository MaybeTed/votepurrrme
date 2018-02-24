const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/www'));

app.get('/nothingyet', function(req, res) {
	res.send('this will be something eventually')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/www/index.html'));
});

const server = app.listen(3000, '127.0.0.1',  function() {
	const host = server.address().address;
	const port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
