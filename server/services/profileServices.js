import bcrypt from "bcrypt";
import Profile from "../models/user.js";

export const registerService = async (name, email, phone, password) => {
    const trimmedEmail = email.toLowerCase().trim();

    const findProfile = await Profile.findOne({ email: trimmedEmail });

    if (!findProfile) {
        const error = new Error("Email not found");
        error.status = 404;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Profile.create({
        name,
        email: trimmedEmail,
        phone,
        password: hashedPassword,
    });
};
