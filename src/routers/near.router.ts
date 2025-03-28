import expressAsyncHandler from "express-async-handler";
import { Router } from "express";
import mongoose from "mongoose";
import { PlacesModel } from "../models/places.model";

const router = Router();

router.get("/test", expressAsyncHandler(async (req, res) => {
  res.json({ message: "Hello World" }); // ✅ No return statement needed
}));


// 📍 Find Nearest Travel Destination within Budget & Filters
router.get("/near", expressAsyncHandler(async (req, res) => {
  try {
    const lat = parseFloat(String(req.query.lat));
    const lon = parseFloat(String(req.query.lon));
    const budget = parseInt(String(req.query.budget));
    const category = req.query.category ? String(req.query.category) : undefined;
    const minRating = req.query.minRating ? parseFloat(String(req.query.minRating)) : undefined;

    if (isNaN(lat) || isNaN(lon) || isNaN(budget)) {
      res.status(400).json({ error: "Invalid or missing lat, lon, or budget" });
      return 
    }

    const query: any = {
      $or: [
        { "price_range.budget": { $lte: budget } },
        { "price_range.standard": { $lte: budget } },
        { "price_range.luxury": { $lte: budget } }
      ],
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lon, lat] },
          $maxDistance: 500000, // 500 km max range
        },
      }
    };

    if (category) {
      query.category = category;
    }

    if (minRating !== undefined) {
      query["ratings.average"] = { $gte: minRating };
    }

    const nearestPlace = await PlacesModel.find(query).sort({ "ratings.average": -1 }).limit(1);

    if (!nearestPlace.length) {
      res.status(404).json({ message: "No suitable destination found within budget." });
      return;
    }

    res.json(nearestPlace[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}));


export default router;
