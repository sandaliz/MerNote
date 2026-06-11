import ratelimit from "../config/upstash.js" //backend/src/config/upstash.js

const rateLimiter = async (req, res, next) => {
    // Skip rate limiting in development if no internet
    if (process.env.NODE_ENV !== "production") {
        return next();
    }

    try {
        const key = req.ip || "global"; // fallback
        const { success } = await ratelimit.limit(key);

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later!"
            });
        }
        next();
    } catch (error) {
        console.log("Rate limit error!", error.message);
        // If Upstash is unreachable, allow the request to pass through
        next();
    }
}

export default rateLimiter;