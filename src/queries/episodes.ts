const episodesQuery = () => fetch('https://rickandmortyapi.com/api/episode').then(async (data: Response) => {
    const parsed = await data.json()
    const {info, results} = parsed
    return {info, results}
})

export default episodesQuery;
