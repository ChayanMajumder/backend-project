import 'dotenv/config'
import connectDB from "./db/index.js";


console.log(process.env.MONGODB_URL);

connectDB()