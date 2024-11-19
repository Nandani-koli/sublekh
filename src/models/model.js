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


const reviewSchema = new mongoose.Schema({
  spaceId: { type: mongoose.SchemaTypes.ObjectId , ref : 'spaces', required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  name: { type: String },
  email: { type: String },
  social: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Reviews = mongoose.models.reviews || mongoose.model("reviews", reviewSchema);
export default Reviews;
