
import { z } from "zod";

export const loginSchema = z.object({
  name: z
    .string()
    .min(5, "Please enter your name (min 5 chars)."),

  email: z.email("Please enter a valid email."),
});

export type LoginForm = z.infer<typeof loginSchema>;