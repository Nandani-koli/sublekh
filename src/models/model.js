import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
},{ timestamps: true });

const Users = mongoose.models.Users || mongoose.model('Users', UserSchema);

export default Users;
