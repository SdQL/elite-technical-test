import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/userService.js';
import { successResponse } from '../utils/response.js';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, avatarUrl } = req.body;

        const user = await UserService.createUser({ name, email, avatarUrl });

        res.status(201).json(successResponse(user));
    } catch (error) {
        next(error)
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let page = parseInt(req.query.page as string) || 1
        let limit = parseInt(req.query.limit as string) || 10

        page = Math.max(1, page);
        limit = Math.min(10, Math.max(1, limit));

        const result = await UserService.getAllUsers(page, limit);

        res.status(200).json(successResponse(result));
    } catch (error) {
        next(error)
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await UserService.getUserById(id);

        res.status(200).json(successResponse(user));
    } catch (error) {
        next(error)
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const user = await UserService.updateUser(id, updateData);

        res.status(200).json(successResponse(user));
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await UserService.deleteUser(id);

        res.status(204).json(successResponse(result));
    } catch (error) {
        next(error);
    }
};