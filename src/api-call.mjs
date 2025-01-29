// import fetch from "node-fetch";

export const API = 'https://pokeapi.co/api/v2/pokemon'

async function fetchData(urlApi) {
    const response = await fetch(urlApi)
    const data = await response.json()
    return data
}

export async function getPokemonData(urlAPI) {
    return await fetchData(`${urlAPI}`)
}