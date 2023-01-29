import episodesQuerySchema from "@/data/queries/schemas/episodeQuerySchema";
import {ZodError} from "zod";
import localFont from "@next/font/local";

const episodesQuery = () => fetch('https://rickandmortyapi.com/api/episode').then(async (data: Response) => {
    try {
        const parsed = await data.json()
        const result = episodesQuerySchema.parse(parsed)
        const {info, results} = result

        return {info, results}
    } catch (e) {
        console.log('debug: error', e)
    }

})

export default episodesQuery;
