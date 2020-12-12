// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require ('express'); // easy!
// Start up an instance of app
const app = express(); // easier!

const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080; // the local host port
app.listen(port, function () {
  console.log('the system running on localhost port: ' + port)
});

app.get('/all', sData)

function sData (req, res) {  // sData = send data
    res.send(projectData);
};

app.post('/add', aData)
function aData (req, res) {  // aData = add Data

        projectData.temp = req.body.temp;
        projectData.date = req.body.date;
        projectData.u_response = req.body.u_response;

            res.send(projectData);


};
