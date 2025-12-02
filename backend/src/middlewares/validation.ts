import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod"

export const validateRequest = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const zodError = error as z.ZodError;
                return res.status(400).json({
                    success: false,
                    error: "Validation failed",
                    details: zodError.issues.map(issue => ({
                        field: issue.path.join('.'),
                        message: issue.message
                    }))
                })
            } else {
                next(error)
            }
        }
    }
}


export const validateParams = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.params)
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const zodError = error as z.ZodError;
                return res.status(400).json({
                    success: false,
                    error: "Parameter validation failed",
                    details: zodError.issues.map(issue => ({
                        field: issue.path.join('.'),
                        message: issue.message
                    }))
                })
            } else {
                next(error)
            }
        }
    }
}