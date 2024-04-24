
import { Router } from 'express';
import { Sample_Plces } from "../data";
import expressAsyncHandler from 'express-async-handler';
import { PlacesModel } from '../models/places.model';

const router=Router();

router.get("/seed",expressAsyncHandler(
  async (req,res)=>{
    const placesCount=await PlacesModel.countDocuments();
    if(placesCount>0){
      res.send("Seed is already Done");
      return;
    }
    
    await PlacesModel.create(Sample_Plces);
    res.send("Seed is Done");
  }
))

router.get("/",expressAsyncHandler(
  async(req,res)=>{
    const places=await PlacesModel.find();
    res.send(places);
  }
))

router.get("/search/:searchTerm", expressAsyncHandler(
  async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const filteredPlaces = await PlacesModel.find({
      $or: [
        { name: { $regex: searchRegex } },
        { tags: { $regex: searchRegex } }  
      ]
    });
    res.send(filteredPlaces);
  }
));


router.get("/:placeId",expressAsyncHandler(async(req,res)=>{
  const place=await PlacesModel.findById(req.params.placeId);
  res.send(place);
}));


export default router;
