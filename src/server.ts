import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import  placeRouter  from './routers/place.router';
import userRouter from './routers/user.router';
import nearRouter from './routers/near.router'
import { dbconncet } from './configs/database.config';
dbconncet();

const app = express();
app.use(express.json());

app.use(cors({
    credentials:true,
    origin: ["http://localhost:4200","https://packyourbags-swart.vercel.app"]
}));


app.use("/api/places",placeRouter);
app.use("/api/users",userRouter);
app.use("/api",nearRouter);

// (app as any)._router.stack.forEach((layer: any) => {
//     if (layer.route) {
//       console.log(layer.route.path);
//     }
//   });
app.get("/", (req, res) => {
    res.send("Welcome to the backend server of packyourbags");
  });
  

const port=5000;
app.listen(port,()=>{
    console.log("Website served on http://localhost:"+port);
});