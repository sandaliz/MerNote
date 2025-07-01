import ratelimit from "../config/upstash.js" //backend/src/config/upstash.js

const rateLimiter = async (req, res, next) => {

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
        console.log("Rate limit error!", error);
        next(error);
    }
}

export default rateLimiter;