
import { Schema, model } from 'mongoose';


const PlaceSchema = new Schema({
  name: { type: String, required: true },

  location: {
    type: { type: String, enum: ["Point"], required: true, default: "Point" },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },

  price_range: {
    budget: { type: Number, required: true },
    standard: { type: Number, required: true },
    luxury: { type: Number, required: true }
  },

  category: { type: String, required: true },

  tags: [{ type: String }], // List of keywords for filtering

  imageUrl: { type: String, required: true },
  backgroundUrl: { type: String, required: true },

  duration: { type: String, required: true },
  best_time_to_visit: { type: String },

  landmarks: [
    {
      name: { type: String, required: true },
      coordinates: {
        type: { type: String, enum: ["Point"], required: true, default: "Point" },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
      }
    }
  ],

  content: [{ type: String }], // List of descriptions

  ratings: {
    average: { type: Number, default: 0 },
    total_reviews: { type: Number, default: 0 }
  },

  reviews: [
    {
      user: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String },
      date: { type: Date, default: Date.now }
    }
  ],

  activities: [{ type: String }], // List of things to do

  transportation_options: {
    airport: { type: String },
    metro: { type: String },
    taxis_available: { type: Boolean },
    rental_cars: { type: Boolean }
  },

  currency_exchange: {
    currency: { type: String },
    usd_conversion_rate: { type: Number }
  },

  emergency_services: {
    police: { type: String },
    ambulance: { type: String },
    fire: { type: String }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Enable MongoDB Geospatial Indexing
PlaceSchema.index({ location: "2dsphere" });

const PlacesModel = model("PlacesModel", PlaceSchema);
export {PlacesModel};