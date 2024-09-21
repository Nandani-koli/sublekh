'use server'

import dbConnect from "./dbconfig";
import {Users} from "@/models/model";
await dbConnect();


export async function createUser(user) {
   console.log(Users); 
    const existingUser = await Users.findOne({ id: user.id });
    console.log(existingUser,'llll',user)

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
