
import { Schema, model } from 'mongoose';

// Define the schema for the contact message
const contactMessageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the ContactMessage model
const ContactMessageModel = model('ContactMessage', contactMessageSchema);

export { ContactMessageModel };
