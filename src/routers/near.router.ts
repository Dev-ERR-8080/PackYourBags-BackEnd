import expressAsyncHandler from "express-async-handler";
import { Router } from "express";
import { PlacesModel } from "../models/places.model";

const router = Router();


// 📍 Find Nearest Travel Destination within Budget & Filters
router.get("/near", expressAsyncHandler(async (req, res) => {
  
  try {
    const lat = parseFloat(String(req.query.lat));
    const lon = parseFloat(String(req.query.lon));
    const budgetParam = parseInt(String(req.query.budget));
    const budget = budgetParam !== undefined && !isNaN(Number(budgetParam)) ? parseInt(String(budgetParam)) : null;
    const category = req.query.category ? String(req.query.category) : undefined;
    const minRating = req.query.minRating ? parseFloat(String(req.query.minRating)) : undefined;
    
    // || isNaN(budget)
    if (isNaN(lat) || isNaN(lon) ) {
      res.status(400).json({ error: "Invalid or missing Lat, Lon." });
      return 
    }

    const query: any = {
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lon, lat] },
          $maxDistance: 2000000, // 2000 km max range
        },
      }
    };

    if(budget!=null){
      query.$or = [
        { "price_range.budget": { $lte: budget } },
        { "price_range.standard": { $lte: budget } },
        { "price_range.luxury": { $lte: budget } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (minRating !== undefined) {
      query["ratings.average"] = { $gte: minRating };
    }
    // console.log("Final Query:", JSON.stringify(query, null, 2));

    const nearestPlace = await PlacesModel.find(query).sort({ "ratings.average": -1 }).limit(3);

    if (!nearestPlace.length) {
      res.status(404).json({ message: "No suitable destination found within Budget." });
      return;
    }

    res.json(nearestPlace[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}));


export default router;
