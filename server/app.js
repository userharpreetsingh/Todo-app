import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/todo.db.js";
import todoRoutes from "./routes/todo.route.js";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Database connection
connectDb();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
