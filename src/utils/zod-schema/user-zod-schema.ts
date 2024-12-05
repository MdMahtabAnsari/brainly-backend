import {z} from 'zod';

export const userZodSchema = z.object({
    username: z.string().min(3, {message:"username must be at least 3 characters long"}).max(20, {message:"username must be at most 10 characters long"}),
  //   password have to be at least 8 characters long, at most 20 characters long, and contain at least one uppercase letter, one lowercase letter, and one number,one special character
    password:z.string().min(8,{message:"password must be at least 8 characters long"}).max(20,{message:"password must be at most 20 characters long"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,{message:"password must contain at least one uppercase letter, one lowercase letter, one number,one special character"})
});

export const paramUserZodSchema = z.object({
//     userId have to be a valid MongoDB ObjectId
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, {message:"userId must be a valid MongoDB ObjectId"})
});

export type userInputType = z.infer<typeof userZodSchema>;
