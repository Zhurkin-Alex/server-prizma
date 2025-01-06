import { NextFunction, Request, Response } from "express";

export const authMiddleWare = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: "Unauthorized" });
            return; // Ensure the function exits after sending a response
        }

        // Continue to the next middleware if authorized
        next();
    } catch (error) {
        console.error("Error in auth middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
