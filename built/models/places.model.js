"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesModel = exports.PlacesSchema = void 0;
var mongoose_1 = require("mongoose");
exports.PlacesSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    backgroundUrl: { type: String, required: true },
    duration: { type: String, required: true },
    content: { type: [String], required: true },
    lats: { type: [Number], required: true },
    lngs: { type: [Number], required: true }
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});
exports.PlacesModel = (0, mongoose_1.model)('places', exports.PlacesSchema);
