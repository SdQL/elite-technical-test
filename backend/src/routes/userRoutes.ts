import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/userController.js";
import { createUserSchema, updateUserSchema, userParamsSchema } from "../validators/userValidator.js";
import { validateRequest, validateParams } from "../middlewares/validation.js";

const router = Router();

router.get('/', getUsers);
router.get('/:id', validateParams(userParamsSchema), getUserById);
router.post('/', validateRequest(createUserSchema), createUser);
router.put('/:id', validateParams(userParamsSchema), validateRequest(updateUserSchema), updateUser);
router.delete('/:id', validateParams(userParamsSchema), deleteUser);

export default router;
