"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactMessageModel = void 0;
var mongoose_1 = require("mongoose");
// Define the schema for the contact message
var contactMessageSchema = new mongoose_1.Schema({
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
var ContactMessageModel = (0, mongoose_1.model)('ContactMessage', contactMessageSchema);
exports.ContactMessageModel = ContactMessageModel;
