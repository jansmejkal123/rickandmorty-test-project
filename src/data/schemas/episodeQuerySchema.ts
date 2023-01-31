import {z} from 'zod'

const location = z.object({
    name: z.string().nullable(),
    dimension: z.string().nullable(),
})

const character = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    species: z.string(),
    gender: z.enum(['Female', 'Male', 'Genderless', 'unknown']),
    created: z.string(),
    type: z.string(),
    status: z.enum(['Alive', 'Dead', 'unknown']),
    origin: location,
    location: location,
    episode: z.array(z.object({
            id: z.string(),
            name: z.string(),
        })
    )

})

const episode = z.object({
    id: z.string(),
    name: z.string(),
    air_date: z.string(),
    episode: z.string(),
    characters: z.array(character),

})

const episodeQuerySchema = z.object({
    episode: episode
})

export default episodeQuerySchema


