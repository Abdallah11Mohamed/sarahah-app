import express from "express";
import { config } from "./src/Config/config.js";
import { connectDB } from "./src/Db/db.connection.js";
import authRouter from "./src/Auth/auth.controller.js";
import userRouter from "./src/users/user.controller.js";
import {
    notFoundHandler,
    globalErrorHandler
} from "./src/middleware/global-error-handler.middleware.js";


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Sarahah API is running"
    });
});

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use(notFoundHandler);
app.use(globalErrorHandler);

try {
    await connectDB();

    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
} catch (error) {
    console.error("Failed to start application:", error.message);
    process.exit(1);
}