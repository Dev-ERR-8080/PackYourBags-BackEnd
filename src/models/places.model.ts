import { Schema, model } from "mongoose";

export interface Places{
    id:String;
    name:string;
    price:number;
    tags:string[];
    stars:number;
    imageUrl:string;
    backgroundUrl:string;
    duration:string;
    content:string[];
    lats:number[];
    lngs:number [];
} 

export const PlacesSchema= new Schema<Places>(
    {
        name:{type:String, required:true},
        price:{type:Number, required:true},
        tags:{type:[String], required:true},
        imageUrl:{type:String, required:true},
        backgroundUrl:{type:String, required:true},
        duration:{type:String, required:true},
        content:{type:[String], required:true},
        lats:{type:[Number], required:true},
        lngs:{type:[Number], required:true}
    },{
        toJSON:{
            virtuals:true,
        },
        toObject:{
            virtuals:true,
        },
        timestamps :true,

    }
);
export const PlacesModel=model<Places>('places',PlacesSchema);
