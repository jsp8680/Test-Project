const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// Connect to the database
//set up body-parser
app.use(bodyParser.urlencoded({extended: true}));

//set up ejs
app.set('view engine', 'ejs');

//set up public folder
app.use(express.static('public'));


//set up mongodb connection

// mongoose.connect(url,connectionParams)
// .then( () => {
//     console.log('Connected to the database');
// })
// .catch((err) => {
//  console.error(`Error connecting to the database. ${err}`);
// }
// );

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Home page route
app.get('/', (req, res) => {
  res.render('index');
});

// Login page route
app.get('/login', (req, res) => {
  res.render('login');
});



// MongoDB connection URL
const url = 'mongodb+srv://censedpower8:coco1234@cluster1.hupl8dz.mongodb.net/clients';

// Database Name
const dbName = 'clients';

// Collection Name
const collectionName = 'client-names';

// Function to insert data into MongoDB
async function insertData(data) {
  // Create a new MongoClient
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the collection
    const collection = db.collection(collectionName);

    // Insert the data
    await collection.insertOne(data);

    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error occurred while inserting data:', error);
    throw error;
  } finally {
    // Close the client connection
    await client.close();
  }
}
// Function to check if a user exists
async function checkUserExists(username) {
  // Create a new MongoClient
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the users collection
    const collection = db.collection(collectionName);

    // Query to find the user
    const query = { username };

    // Find the user
    const user = await collection.findOne(query);

    // Return true if the user exists, false otherwise
    return !!user;
  } catch (error) {
    console.error('Error occurred while checking user existence:', error);
    throw error;
  } finally {
    // Close the client connection
    await client.close();
  }
}

// Usage example
const usernameToCheck =  "John Doe";

checkUserExists(usernameToCheck)
  .then(userExists => {
    console.log(`User ${usernameToCheck} exists: ${userExists}`);
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });

// Usage example
const dataToInsert = {
  username: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
};

insertData(dataToInsert)
  .catch(error => {
    console.error('An error occurred:', error);
  });


  app.get('/register', (req, res) => {
    res.render('register');
  });
  
  // Registration form submission route
  app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
  
    // Create a new MongoClient
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      // Connect to the MongoDB server
      await client.connect();
  
      // Access the database
      const db = client.db(dbName);
  
      // Access the users collection
      const collection = db.collection(collectionName);
  
      // Check if the user already exists
      const existingUser = await collection.findOne({ username });
  
      if (existingUser) {
        return res.send('User already exists. Please choose a different username.');
      }
  
      // Create a new user account
      const newUser = { username, password, email };
      await collection.insertOne(newUser);
  
      return res.send('Registration successful!');
    } catch (error) {
      console.error('Error occurred during registration:', error);
      return res.status(500).send('Internal Server Error');
    } finally {
      // Close the client connection
      await client.close();
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
