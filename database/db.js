import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const Connection=async()=>{
    
    const URL=`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.z1ifkss.mongodb.net/`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true });
        console.log("database connected successfully");
    } catch (error) {
        console.log("cannot connect",error.message);
    }
}

export default Connection;