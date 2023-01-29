import {z} from "zod";

export const responseInfo = z.object({
    count: z.number().optional(),
    pages: z.number().optional(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
})
