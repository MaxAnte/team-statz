import { z } from "zod";

export const UserResponseSchema = z.object({
  token: z.string(),
  userId: z.string(),
});
