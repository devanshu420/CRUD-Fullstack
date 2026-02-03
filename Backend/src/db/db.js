import mongoose from "mongoose";

const connectDB = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connect Successfully');
        
        
        
    } catch (error) {
        console.log("Database Error" , error);
    }
}

export default connectDB;