// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();

// Import routes
let apiRoutes = require("./routers/contactrouter")


// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://bryan:5wswv27bTrftKzHUBu7M3RaFJqVF9UUj@cluster0-shard-00-00-zkbzv.azure.mongodb.net:27017,cluster0-shard-00-01-zkbzv.azure.mongodb.net:27017,cluster0-shard-00-02-zkbzv.azure.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true');

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send(`
<div>This is a working RESTful API example</div></br>

<div><a href='http://localhost:8080/api/contacts'>http://localhost:8080/api/contacts</a></div>`));

// Use Api routes in the App
app.use('/api', apiRoutes)

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RESTfulAPI on port " + port);
});
