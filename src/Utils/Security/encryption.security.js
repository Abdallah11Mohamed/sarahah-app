import crypto from "node:crypto";

const ENCRYPTION_KEY = Buffer.from(
    process.env.ENCRYPTION_KEY,
    "hex"
);

const IV_LENGTH = 16;

export const encrypt = (plainText) => {
    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        ENCRYPTION_KEY,
        iv
    );

    let encrypted = cipher.update(plainText, "utf-8", "hex");

    encrypted += cipher.final("hex");

    return `${iv.toString("hex")}:${encrypted}`;
};

export const decrypt = (fullCipher) => {
    const [iv, originalCipher] = fullCipher.split(":");

    const bufferedIV = Buffer.from(iv, "hex");

    const decipherObject = crypto.createDecipheriv(
        "aes-256-cbc",
        ENCRYPTION_KEY,
        bufferedIV
    );

    let plainText = decipherObject.update(
        originalCipher,
        "hex",
        "utf-8"
    );

    plainText += decipherObject.final("utf-8");

    return plainText;
};