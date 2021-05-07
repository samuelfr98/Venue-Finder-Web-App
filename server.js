const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 3001;
const app = express();
const yelp = require('yelp-fusion');
const api_key = process.env.REACT_APP_YELP_API_KEY;
const client = yelp.client(api_key);
 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());

app.post(`/search`, function (req, res) {
    // grabs the user input
    const requestBody = req.body;
    // console.log("1 "+requestBody);
    const category = Object.keys(requestBody);
    console.log("2 " + category);
    client.search({
        term: `restaurants`,
        price: "1,2,3,4",
        location: `Chapel Hill, NC`,
        radius: 8000,
        categories: category
    }).then((response) => {
        let responses = response.jsonBody.businesses;
        responses = responses.map((r) => ({
            name: r.name,
            price: r.price,
            rating: r.rating,
            website: r.url,
        }));
        // console.log(responses);
        res.send({ message: responses });
    }).catch((err) => {
        console.error(err);
    });
});

app.post(`/barSearch`, function (req, res) {
    // grabs the user input
    const requestBody = req.body;
    // console.log("1 "+requestBody);
    const category = Object.keys(requestBody);
    console.log("2 " + category);
    client.search({
        term: `bars`,
        price: "1,2,3,4",
        location: `Chapel Hill, NC`,
        radius: 8000,
        categories: category
    }).then((response) => {
        let responses = response.jsonBody.businesses;
        responses = responses.map((r) => ({
            name: r.name,
            price: r.price,
            rating: r.rating,
            website: r.url,
        }));
        // console.log(responses);
        res.send({ message: responses });
    }).catch((err) => {
        console.error(err);
    });
});

app.get('/hello', function (req, res) {
    res.send('hello world1')
});

app.get('/', function (req, res) {
    res.send('hello world')
});

app.listen(port, (() => {
    console.log("App is listening on port " + port);
}))

module.exports = app;