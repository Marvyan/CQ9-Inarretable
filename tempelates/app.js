const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const { User, Event, Booking, Venue } = require('./models');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS (not recommended for production, consider configuring it properly)
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/bookingApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Configure Multer for handling file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve your HTML file on the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/venue-registration', (req, res) => {
  // Render the HTML form for venue registration
  res.sendFile(path.join(__dirname, 'venue_registration.html'));
});


// Handle POST request for venue registration
app.post('/venue-registration', upload.array('venue-images', 5), async (req, res) => {
  // Handle venue registration here
  const formData = req.body;
  const venueImages = req.files.map((file) => file.filename);

  try {
    const venue = new Venue({
      venueName: formData['venue-name'],
      venueType: formData['venue-type'],
      venueDescription: formData['venue-description'],
      venueCapacity: formData['venue-capacity'],
      venuePrice: formData['venue-price'],
      currency: formData['currency'],
      location: formData['location'],
      venueImages,
    });

    await venue.save();
    res.send('Venue registered successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Venue registration failed.');
  }
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
