const express = require('express');
const app = express();
const multer = require('multer'); // Import the multer module
const port = 3000;

const { User, Event, Booking, Venue } = require('./models');
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.post('/venue-registration', upload.array('venue-images', 5), async (req, res) => {
  try {
    const formData = req.body;
    const venueImages = req.files.map((file) => file.filename);

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
