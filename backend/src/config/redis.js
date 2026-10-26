// config/redis.js
import Redis from "ioredis";

const redisUri = process.env.UPSTASH_REDIS_URL;

if (!redisUri) {
    console.warn("[Redis] Warning: UPSTASH_REDIS_URL is not set in environment variables.");
}

const redis = new Redis(redisUri, {
    tls: {
        rejectUnauthorized: true,
    },
    lazyConnect: true,
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
        return Math.min(times * 150, 3000);
    },
    reconnectOnError(err) {
        const targetError = "READONLY";
        if (err.message.includes(targetError)) {
            return true;
        }
        return false;
    },
});

redis.on("connect", () => {
    console.log("[Redis] Connected to Upstash successfully.");
});

redis.on("ready", () => {
    console.log("[Redis] Upstash client is ready.");
});

redis.on("error", (err) => {
    console.error("[Redis] Client error:", err.message);
});

redis.on("close", () => {
    console.warn("[Redis] Connection closed.");
});

export default redis;