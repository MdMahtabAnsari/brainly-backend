import {z} from 'zod';

export const paramLinkZodSchema = z.object({
//     hash have to be a valid hash with 10 characters
    hash: z.string().length(10, {message:"Hash must be a valid hash with 10 characters"})
});