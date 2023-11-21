const express = require('express');
const path = require('path');
const cors = require('cors');
const toolsRouter = require("./app/routes/tools.route");
const discoveryRouter = require('./app/routes/discovery.route');
const migrationRouter = require("./app/routes/migration.route");
const coreRouter = require("./app/routes/core.route");
const playbookRouter = require("./app/routes/playbook.route");

var mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const data = require('./data');

app.use(bodyParser.json());
app.use(cors());

app.post('/api/f5login', (req, res, next) => {
  res.status(200).send(data.getF5LoginError);
})

app.get('/api/f5migrationcount', (req, res, next) => {
  res.status(200).send(data.getF5MigrationCount);
})

app.get('/api/f5report', (req, res, next) => {
  res.status(200).send(data.getReportPageData);
})

app.get('/api/f5ready', (req, res, next) => {
  res.status(200).send(data.getReadyPageData);
})

app.get('/api/f5destination', (req, res, next) => {
  res.status(200).send(data.getF5DestinationData);
})

app.post('/api/f5generateplaybook', (req, res, next) => {
  res.status(200).send();
})

app.post('/api/f5pbmarkcomplete', (req, res, next) => {
  res.status(200).send();
})

// MongoDB connection URL
const connUri = (process.env.NODE_ENV === 'production') ? 'mongodb://mongodb:27017/' : 'mongodb://localhost:27017/';

// Database name
const dbName = 'nsxAlbMigrationTools';

// Connect to MongoDB
mongoose.connect(connUri, {
  dbName: dbName,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Serve static files from the 'dist' directory.
app.use(express.static(path.join(__dirname, '../nsx-alb-tools-angular-app', 'dist')));

// Route for serving the data asked by Angular application.
app.use("/migrationTools", toolsRouter);

// Route for Report page.
app.use('/api/discovery', discoveryRouter);

// Route for serving the data asked by Angular application.
app.use("/api/configuration", migrationRouter);

// Route for core APIs which includes API for Destinations, Lab Details etc.
app.use("/api/core", coreRouter);

// Router for Playbook related APIs
app.use("/api/playbook", playbookRouter);

// Route for serving the Angular application.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../nsx-alb-tools-angular-app/dist', 'index.html'));
});

// Error handling middleware.
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging
  res.status(500).json({ error: 'Internal server error' }); // Respond to the client
});

// Start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
