'use server'
import mongoose from "mongoose";
import dbConnect from "./dbconfig";
import {Users, Spaces} from "@/models/model";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

export async function createUser(user) {

    const existingUser = await Users.findOne({ id: user.id });

    if (!existingUser) {
        const newUser = await Users.create({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
        });
        return { status: true, message: 'User created successfully', user: newUser };
    } else {
        return { status: true, message: 'User already exists', user: existingUser };
    }
    
}


export async function createOrUpdateSpace(spaceData, userId, spaceId = null) {
  
    try {
      let logoUrl = spaceData.logo;


      if (spaceData.logo && spaceData.logo.startsWith('data:image')) {
        const uploadResponse = await cloudinary.uploader.upload(spaceData.logo, {
          folder: 'space_logos',
        });
        logoUrl = uploadResponse.secure_url;
      }
  
      const spaceDoc = {
        userId,
        domainName: spaceData.domainName,
        logo: logoUrl,
        heading: spaceData.heading,
        message: spaceData.message,
        questions: spaceData.questions,
        extraInfo: spaceData.extraInfo,
      };
  
      if (spaceId) {
        const updatedSpace = await Spaces.findByIdAndUpdate(spaceId, spaceDoc, { new: true });
        return { success: true, message: 'Space updated successfully', space: updatedSpace };
      } else {
        const newSpace = new Spaces(spaceDoc);
        await newSpace.save();
        return { success: true, message: 'Space created successfully', space: newSpace };
      }
    } catch (error) {
      console.error('Error in createOrUpdateSpace:', error);
      return { success: false, message: error.message };
    }
  }


export async function getAllSpaces(userId,spaceId) {
  try {
    console.log(spaceId,userId,'ppppppppppp')
    if(spaceId)
    {
      const space = await Spaces.findOne({ '_id' : spaceId });
      console.log(space,'wwwwwwwwwww')
      return { success: true, message: 'Space retrieved successfully', space };
    }
    else{
      const spaces = await Spaces.find({ 'userId' : userId });
      return { success: true, message: 'Spaces retrieved successfully', spaces };
    }
  } catch (error) {
    console.error('Error in getAllSpaces:', error);
    return { success: false, message: error.message };
  }
}