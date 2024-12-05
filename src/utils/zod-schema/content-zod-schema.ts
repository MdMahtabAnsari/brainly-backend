import {z} from 'zod';

export const contentZodSchema = z.object({
//     type have to be one of the following values: ['image', 'video', 'text', 'audio']
    type: z.string().refine((value) => ['image', 'video', 'text', 'audio'].includes(value), {
        message: 'Type must be one of the following values: image, video, text, audio'
    }),
    link: z.string().url({message:"Link must be a valid URL"}),
    title: z.string().min(3, {message:"Title must be at least 3 characters long"}).max(50, {message:"Title must be at most 50 characters long"}),
    tags: z.array(z.string().min(3, {message:"Tag must be at least 3 characters long"}).max(10, {message:"Tag must be at most 10 characters long"})).nonempty({message:"Tags must not be empty"})
});

export const paramContentZodSchema = z.object({
//     id have to be a valid MongoDB ObjectId
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, {message:"Id must be a valid MongoDB ObjectId"})
});

export type ContentInputType = z.infer<typeof contentZodSchema>;