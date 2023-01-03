import { z } from 'zod';

export const createUserReqSchema = z.object({
  username: z.string().max(5),
  age: z.number().min(1).max(100, 'age should be smaller than 100'),
  sex: z.number().min(0).max(1),
});

export type CreateUserRequest = z.infer<typeof createUserReqSchema>;
