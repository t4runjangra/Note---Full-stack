// src/routes/redisTest.routes.js
import { Router } from "express";
import redis from "../config/redis.js"; // Import the client instance

const router = Router();

router.get("/redis-test", async (req, res) => {
    const testKey = `test_entry:${Date.now()}`;
    const payload = {
        status: "ok",
        provider: "Upstash",
        timestamp: new Date().toISOString(),
    };

    try {
        // 1. SET with 60-second TTL
        await redis.set(testKey, JSON.stringify(payload), "EX", 60);

        // 2. GET and verify
        const rawData = await redis.get(testKey);

        if (!rawData) {
            return res.status(502).json({
                success: false,
                message: "Redis write succeeded, but GET returned null.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Upstash Redis TLS connection verified successfully!",
            key: testKey,
            data: JSON.parse(rawData),
        });
    } catch (error) {
        console.error("[Redis Test Error]:", error);
        return res.status(500).json({
            success: false,
            error: error.message,
            code: error.code || "REDIS_ERROR",
        });
    }
});

export default router;