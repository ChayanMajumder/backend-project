import 'dotenv/config'
import connectDB from "./db/index.js";
import { app } from './app.js';

const port = process.env.PORT || 3000;

console.log(process.env.MONGODB_URL);

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`server is running ar port ${port}`);
    });
})
.catch((err) => {
    console.log("MONGODB connection failed !!!! ", err);
})