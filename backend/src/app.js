import express from "express"
import authRouter from "./routes/auth.routes.js";
import noteRouter from "./routes/note.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import redis from "./config/redis.js";
import redisTestRoute from "./routes/redisTest.routes.js";
import mongoose from "mongoose";
const app = express();


app.use(express.json())


app.use(cookieParser());

app.use('/api/v1', redisTestRoute);

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}))


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next()
})






app.get('/', (req, res) => {
    res.send("backend Revision started")
})

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        services: {
            mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
            redis: redis.status, 
        },
    });
});
app.use("/api/v1/auth", authRouter)

app.use("/api/v1", noteRouter)
app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.error || []
    });

});

export default app