import {z} from 'zod';

const episodesInfo = z.object({
    count: z.number().nullable(),
    pages: z.number().nullable(),
    next: z.number().nullable(),
    prev: z.number().nullable(),
})

export default episodesInfo
