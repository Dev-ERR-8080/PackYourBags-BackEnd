import { Router } from 'express';
import { Sample_users } from "../data";
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constant/http_status';
import  bcrypt from 'bcryptjs';

const router=Router();

router.get("/seed",expressAsyncHandler(
    async (req,res)=>{
      const usersCount=await UserModel.countDocuments();
      if(usersCount>0){
        res.send("Seed is already Done");
        return;
      }
      
      await UserModel.create(Sample_users);
      res.send("Seed is Done");
    }
  ))

router.post("/login",expressAsyncHandler(
    async(req,res)=>{
    const {email,password}=req.body; 
    const user=await UserModel.findOne({email,password});
    if(user){
        res.send(generateTokenResponse(user))
    }else{
        res.status(HTTP_BAD_REQUEST).send("user name and password not valid!");
    }
}
))

router.post('/register',expressAsyncHandler(
    async(req,res)=>{
        const{name,email,password,address,phone}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            res.status(HTTP_BAD_REQUEST).send("User Is Already exist!");
            return;
        }
    const encryptedpassword=await bcrypt.hash(password,10);

    const newuser:User={
        id:'',
        name,
        email:email.toLowerCase(),
        password:encryptedpassword,
        address,
        phone,
        isAdmin:false,
    }

    const dbuser=await UserModel.create(newuser);
    res.send(generateTokenResponse(dbuser));
    }
))

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, "SomeRandomText", {
        expiresIn: "30d"  // Corrected property name from exipresIn to expiresIn
    });
    user.token = token;
    return user;
};

export default router;