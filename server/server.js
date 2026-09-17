import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./config/db.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
    }),
);
app.use(express.json());

const startServer = async () => {
    await connectDb();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
