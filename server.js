// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const promptRoutes = require('./routes/promptRoutes');
const cors = require('cors');


dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use('/api', promptRoutes);

// Add a route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the ARMOR API');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
