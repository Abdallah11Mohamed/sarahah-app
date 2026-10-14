import argon2 from "argon2";

export const hash = async (plainText) => {
    return await argon2.hash(plainText);
};

export const compareHash = async (plainText, hashedText) => {
    return await argon2.verify(hashedText, plainText);
};