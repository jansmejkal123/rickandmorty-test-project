import {z} from "zod";

export const responseInfo = z.object({
    count: z.number().optional().nullable(),
    pages: z.number().optional().nullable(),
    next: z.string().optional().nullable(),
    prev: z.string().optional().nullable(),
})
