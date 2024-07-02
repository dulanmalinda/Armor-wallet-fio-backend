const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const http = require('http');

dotenv.config();

connectDB();

const app = express();

const corsOptions = {
  origin: '*',
  methods: '*',
  allowedHeaders: '*',
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

//app.use(express.json());

app.use('/api', userRoutes);

// Add a route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the ARMOR FIO API v4');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// // Load SSL certificates
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/prompt.armorwallet.ai/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/prompt.armorwallet.ai/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/prompt.armorwallet.ai/chain.pem', 'utf8');

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca
// };

// // Redirect HTTP to HTTPS
// const httpApp = express();
// httpApp.use((req, res, next) => {
//   if (!req.secure) {
//     return res.redirect(`https://${req.headers.host}${req.url}`);
//   }
//   next();
// });

// // Listen on port 80 for HTTP requests
// const httpServer = http.createServer(httpApp);
// httpServer.listen(80, () => {
//   console.log('HTTP Server running on port 80');
// });

// // Listen on port 443 for HTTPS requests
// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(PORT, () => {
//   console.log(`HTTPS Server running on port ${PORT}`);
// });
