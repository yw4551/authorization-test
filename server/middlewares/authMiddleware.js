import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const headers = req.headers.authorization;

        if (!headers || !headers.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                error: "Authentication required",
            });
        }

        const token = headers.split(" ")[1];
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        req.profile = verifyToken;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            error: "Invalid or expired token",
        });
    }
};

export default authMiddleware;
