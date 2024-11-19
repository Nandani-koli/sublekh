'use server'
import mongoose from "mongoose";
import dbConnect from "./dbconfig";
import Reviews, { Users, Spaces } from "@/models/model";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

dbConnect();

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

    const preSpace = await Spaces.findOne({ 'domainName': spaceData.domainName});

      if(preSpace)
      {
        return { success: false, message: 'Domain name already exists' };
      }

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
      return { success: true, message: 'Space created successfully' };
    }
  } catch (error) {
    console.error('Error in createOrUpdateSpace:', error);
    return { success: false, message: error.message };
  }
}


export async function getAllSpaces(userId, spaceId) {
  try {
    if (spaceId) {
      const space = await Spaces.findOne({ '_id': spaceId });
      return { success: true, message: 'Space retrieved successfully', space };
    }
    else {
      const spacesWithReviews = await Spaces.find({ 'userId': userId });

      const spaces = await Promise.all(
        spacesWithReviews.map(async (space) => {
          const reviewCount = await Reviews.countDocuments({ 'spaceId': space._id });
          return {
            ...space.toObject(),
            reviews: reviewCount,
          };
        })
      );

      return { success: true, message: 'Spaces retrieved successfully', spaces };
    }
  } catch (error) {
    console.error('Error in getAllSpaces:', error);
    return { success: false, message: error.message };
  }
}

export async function getSubDomainData(domain) {
  try {
    if (domain) {
      const space = await Spaces.findOne({ 'domainName': domain }).lean();

      if (space) {
        return { success: true, space };
      }
      else {
        return { success: false, message: 'Domain not found' };
      }
    }
    else {
      return { success: false, message: 'Domain not found' };
    }
  } catch (error) {
    console.error('Error in getAllSpaces:', error);
    return { success: false, message: error.message };
  }
}

export async function saveReview(data) {
  try {

    console.log(data);

    if (data.domain) {
      const space = await Spaces.findOne({ 'domainName': data.domain })
      let updatedata = {
        ...data,
        spaceId: space._id
      }
      const review = new Reviews(updatedata);
      await review.save();
      return { success: true, message: "Thank you for your review." };
    }
    else {
      return { success: false, message: "Domain is invalid" };
    }
  } catch (error) {
    console.error("Error saving review:", error);
    return { success: false, message: error.message };
  }
}

export async function fetchReviewsBySpaceId(spaceId) {
  try {

    if(spaceId)
    {
      const reviews = await Reviews.find({ spaceId: spaceId }).sort({ createdAt: -1 }); 
      return { success: true, reviews };
    }
    else{
      return { success: false, message: 'Space ID not found' };
    }

  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { success: false, message: error.message };
  }
}