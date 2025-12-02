import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { errorResponse } from "../utils/response.js";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof z.ZodError) {
        const zodError = err as z.ZodError;
        return res.status(400).json(errorResponse("Validation Error", zodError.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
        }))));
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json(errorResponse('Email already exists'))
    }

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json(
            errorResponse('Invalid data', err.errors.map((e: any) => ({
                field: e.path,
                message: e.message
            })))
        )
    }

    if (err.statusCode) {
        return res.status(err.statusCode).json(
            errorResponse(err.message)
        )
    }

    return res.status(500).json(
        errorResponse('Internal server error')
    )
}
