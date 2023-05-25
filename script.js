
// setup a server
const http = require('http');
const ejs = require('ejs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;



//set up body-parser
app.use(bodyParser.urlencoded({extended: true}));

//set up ejs
app.set('view engine', 'ejs');

//set up public folder
app.use(express.static('public'));

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
};

url = 'mongodb+srv://censedpower8:coco1234@cluster1.hupl8dz.mongodb.net/clients';
//set up mongodb connection

mongoose.connect(url,connectionParams)
.then( () => {
    console.log('Connected to the database');
})
.catch((err) => {
 console.error(`Error connecting to the database. ${err}`);
}
);

// set the port, 3000 is a common port
// add something to the db
// add name, phone, email, and address
// add a route to show the data
// add a route to show the form
// add a route to process the form

// setup a route to show index.ejs
app.get('/', (req, res) => {
    res.render('index.html');
    }
);

// setup a route to show the form
app.get('/form', (req, res) => {
    res.render('form.ejs');
    }
);

// setup a route to process the form
app.post('/form', (req, res) => {
    console.log(req.body);
    res.render('form.ejs');
    }
);

// setup a route to show the data
app.get('/data', (req, res) => {
    res.render('data.ejs');
    }
);
;


const port = 3000;



// start the server

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);