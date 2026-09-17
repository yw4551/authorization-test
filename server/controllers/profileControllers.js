import { registerService } from "../services/profileServices.js";

export const register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                error: "Name is required",
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                error: "Email is required",
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                error: "Password is required",
            });
        }

        const profile = await registerService(name, email, phone, password);

        res.status(201).json({
            success: true,
            message: "Profile created successfully",
            data: {
                profile,
            },
        });
    } catch (err) {
        res.status(err.status).json({
            success: false,
            error: err.message,
        });
    }
};
