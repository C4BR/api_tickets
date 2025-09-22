import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../config/Validation'

import { z } from 'zod'

export const nameSchema = z
    .string()
    .min(NAME_MIN_LENGTH)
    .max(NAME_MAX_LENGTH)

export const emailSchema = z
    .email()

export const passwordSchema = z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .max(PASSWORD_MAX_LENGTH)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character")

export const createUserSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema
})   