import express from "express";
import dotenv from "dotenv";
import  dbConnection from "./src/Db/db.connection.js";
import { userModel } from "./src/Db/Models/user.model.js";
import authRouter from "./src/Auth/auth.controller.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

dbConnection();


app.get("/", (req, res) => {
    res.send("Hello NoSQL");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});