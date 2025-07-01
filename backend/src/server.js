// Description: This code sets up a basic Express server that listens on port 5001.
// It imports the Express library, creates an app instance, and starts the server.
import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path"

import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"

process.on("unhandledRejection", err => {
    console.error("Unhandled Rejection:", err);
    process.exit(1);
});

process.on("uncaughtException", err => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});


dotenv.config(); // Load environment variables from .env file



const app = express();
const PORT = process.env.PORT || 5001; // Default port is 5001 if not specified in environment variables
const __dirname = path.resolve();

//middleware
app.use(express.json()); //this will send req to ctrller

if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }))
}

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes); //user signup/login routes

// app.use ((req, res, next) => { //simple middleware 
//     console.log(`Req method is ${req.method} & Req URL is: ${req.url}`); //on terminal
//     next();
// })

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist"))) //__dirname will go to backend so here what we do is
    //go one up then tell it to go to frontend folder and use its dst as a static

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/", "dist", "index.html"))
    });
}

connectDB().then(() => { //1st connect db then, listen - better option
    // Start the server on port PORT
    app.listen(PORT, () => {
        console.log(`Server started running on PORT ${PORT}`);
    });
});




