import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String},
    image: { type: String },
},{ timestamps: true });

export const Users = mongoose.models.users || mongoose.model('users', UserSchema);

const SpaceSchema = new mongoose.Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId , ref : 'users', required: true },
    domainName: { type: String, required: true, unique: true },
    logo: { type: String },
    heading: { type: String, required: true },
    message: { type: String },
    questions: [{ question: String }],
    extraInfo: [String],
  });
  
export const Spaces = mongoose.models.spaces || mongoose.model('spaces', SpaceSchema);
  