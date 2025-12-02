import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
})

export const updateUserSchema = z.object({
    name: z.string().min(2).max(50).optional(),
    email: z.string().email().optional(),
    avatarUrl: z.string().url().optional(),
})

export const userParamsSchema = z.object({
    id: z.string().uuid(),
})