import mongoose from "mongoose";

export default async function dbConnect() {
    const uri = process.env.dbURL;

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: true,
        });

        console.log('Connection successful')
    } catch (error) {
        throw error;
    }
}