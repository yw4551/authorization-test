import mongoose from "mongoose";

const UserProfile = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 20,
        },
    },
    {
        timestamps: true,
    },
);

const Profile = mongoose.model("Profile", UserProfile);

export default Profile;
