"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleWare = void 0;
const authMiddleWare = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: "Unauthorized" });
            return; // Ensure the function exits after sending a response
        }
        // Continue to the next middleware if authorized
        next();
    }
    catch (error) {
        console.error("Error in auth middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.authMiddleWare = authMiddleWare;
