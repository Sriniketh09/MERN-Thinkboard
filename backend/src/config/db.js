import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb connecton Successful");
    } catch (error){
        console.error("MongoDb connection Failed", error);
        process.exit(1);
    }
}