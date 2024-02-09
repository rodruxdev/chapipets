import { z } from "zod";

const userSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .max(255, {
      message: "Name must be 255 or fewer characters long.",
    }),
  description: z.string({
    invalid_type_error: "Description must be a string.",
  }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Invalid email address",
    }),
  cellphone: z.string({
    invalid_type_error: "Cellphone must be a string",
  }),
  // .regex("", { message: "Invalid cellphone number" }),
  password: z.string({
    required_error: "Password is required",
  }),
  role: z.enum(["admin", "user"], {
    required_error: "Role is required",
    invalid_type_error: "Role must be a valid value.",
  }),
});

export function validateUser(input) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}
