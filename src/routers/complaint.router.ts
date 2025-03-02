import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { ContactMessageModel } from '../models/complaint.model';
import { HTTP_BAD_REQUEST } from '../constant/http_status';


const router = Router();

// Endpoint for saving contact messages
router.post('/contact', expressAsyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    // Validate input data
    if (!name || !email || !message) {
        res.status(HTTP_BAD_REQUEST).send('Missing required fields');
        return;
    }

    // Create a new contact message object
    const newMessage = new ContactMessageModel({
        name,
        email,
        message
    });

    try {
        // Save the message to the database
        await newMessage.save();
        res.status(201).send('Message saved successfully');
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).send('Internal server error');
    }
}));

export default router;
