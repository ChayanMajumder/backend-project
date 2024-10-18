import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionDB = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`DabaBase Connected !! DB HOST: ${connectionDB.connection.host}`);
    } catch (error) {
        console.log("connection ERROR:", error);
        process.exit(1);
    }
}


export default connectDB