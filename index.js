const express = require('express');
const dexRoutes = require('./routes/dexRoutes'); // import the routes

const app = express();
const port = 5000;

var bodyParser = require('body-parser');

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, Content-Type Cache-Control'
    );
    res.header('Cache-Control', 'max-age=0');
    next();
  });
  
app.use(bodyParser.json({
    type: 'application/json'
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api/dex', dexRoutes); //to use the routes

app.get('*', function (req, res) {
    return res.status(404).json({
        msg: 'Page Not Found'
    });
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});