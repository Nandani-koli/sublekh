import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String},
    image: { type: String },
},{ timestamps: true });

export const Users = mongoose.models.users || mongoose.model('users', UserSchema);
