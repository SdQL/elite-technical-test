import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
  role: z.string().min(2).max(50),
  company: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().min(2).max(100).optional(),
})

export const updateUserSchema = z.object({
    name: z.string().min(2).max(50).optional(),
    email: z.string().email().optional(),
    avatarUrl: z.string().url().optional(),
    role: z.string().min(2).max(100).optional(),
    company: z.string().max(100).optional(),
    bio: z.string().max(500).optional(),
    location: z.string().max(100).optional(),
})


export const userParamsSchema = z.object({
    id: z.string().uuid(),
})