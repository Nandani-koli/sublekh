'use server'
import mongoose from "mongoose";
import dbConnect from "./dbconfig";
import {Users} from "@/models/model";


export async function createUser(user) {

    const existingUser = await Users.findOne({ id: user.id });

    if (!existingUser) {
        await Users.create({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
        });
    }

    return { status : true, message : 'User Login successful' };
}
