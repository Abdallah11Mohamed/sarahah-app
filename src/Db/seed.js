import "dotenv/config";
import mongoose from "mongoose";
import userModel from "./Models/user.model.js";
import { hash } from "../Utils/Security/hash.security.js";
import { config } from "../Config/config.js";

const seedUsers = [
    {
        username: "demo_user",
        email: "demo@example.com",
        password: "DemoPass123",
        phone: "01012345678"
    },
    {
        username: "test_user",
        email: "test@example.com",
        password: "TestPass123",
        phone: "01112345678"
    }
];

try {
    await mongoose.connect(config.mongoUri);

    for (const seedUser of seedUsers) {
        const exists = await userModel.findOne({ email: seedUser.email });
        if (!exists) {
            await userModel.create({
                ...seedUser,
                password: await hash(seedUser.password)
            });
            console.log(`Seeded user: ${seedUser.email}`);
        } else {
            console.log(`Skipped existing user: ${seedUser.email}`);
        }
    }
} catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}
