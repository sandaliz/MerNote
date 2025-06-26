// Description: This code sets up a basic Express server that listens on port 5001.
// It imports the Express library, creates an app instance, and starts the server.
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001; // Default port is 5001 if not specified in environment variables

//middleware
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json()); //this will send req to ctrller
app.use(rateLimiter);

// app.use ((req, res, next) => { //simple middleware 
//     console.log(`Req method is ${req.method} & Req URL is: ${req.url}`); //on terminal
//     next();
// })

app.use("/api/notes", notesRoutes);

connectDB().then(() => { //1st connect db then, listen - better option
    // Start the server on port PORT
    app.listen(PORT, () => {
        console.log(`Server started running on PORT ${PORT}`);
    });
});


