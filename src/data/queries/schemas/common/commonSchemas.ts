import {z} from "zod";

export const responseInfo = z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
})
