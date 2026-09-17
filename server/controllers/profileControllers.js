import { loginService, registerService } from "../services/profileServices.js";

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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

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

        const token = await loginService(email, password);

        res.json({
            success: true,
            message: "User logged in successfully",
            data: {
                token,
            },
        });
    } catch (error) {
        res.status(error.status).json({
            success: false,
            error: error.message,
        });
    }
};
