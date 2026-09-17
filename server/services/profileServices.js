import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Profile from "../models/profile.js";

export const registerService = async (name, email, phone, password) => {
    const trimmedEmail = email.toLowerCase().trim();

    const findProfile = await Profile.findOne({ email: trimmedEmail });

    if (findProfile) {
        const error = new Error("Email already in use");
        error.status = 409;
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

export const loginService = async (email, password) => {
    const trimmedEmail = email.toLowerCase().trim();

    const profile = await Profile.findOne({ email: trimmedEmail });

    if (!profile) {
        const error = new Error("Profile not found");
        error.status = 404;
        throw error;
    }

    const matchPassword = await bcrypt.compare(password, profile.password);

    if (!matchPassword) {
        const error = new Error("Invalid Password");
        error.status = 401;
        throw error;
    }

    const token = jwt.sign(
        { profileId: profile._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
    );

    return token;
};

export const getById = async (id) => {
    const profile = await Profile.findById(id).select(-password);
    return profile;
};
