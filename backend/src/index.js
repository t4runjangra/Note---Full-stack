// index.js
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./db/index.js";
import redis from "./config/redis.js"; // adjust path if needed

const port = process.env.PORT || 8000;

connectDB()
    .then(async () => {
        // Connect Redis (non-fatal: app will continue even if Redis fails)
        try {
            await redis.connect();
        } catch (err) {
            console.warn("[Redis] Connection warning (operating without cache):", err.message);
        }

        app.listen(port, () => {
            console.log(`Server is listening at port ${port}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
        process.exit(1);
    });