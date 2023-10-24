const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDate: Date,
  description: String,
  location: String,
});

const Event = mongoose.model('Event', eventSchema);

const bookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  eventId: mongoose.Schema.Types.ObjectId,
  bookingDate: Date,
});

const Booking = mongoose.model('Booking', bookingSchema);

const venueSchema = new mongoose.Schema({
  venueName: String,
  venueType: String,
  venueDescription: String,
  venueCapacity: Number,
  venuePrice: Number,
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'UGX'],
  },
  location: String,
  venueImages: [String],
});

const Venue = mongoose.model('Venue', venueSchema);

  

module.exports = { User, Event, Booking, Venue };
