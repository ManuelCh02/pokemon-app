import { getPokemonData} from './api-call.mjs'
import { API } from './api-call.mjs'

const GLOBAL_RESEARCH = 10
const maninContainer = document.querySelector('.main-container')
const pokemonMovementContainer = document.querySelector('.pokemon-card__movements-list-container')

async function showPokemonData(urlAPI) {
    try {
        const data = await getPokemonData(urlAPI)
        return data
    } catch(error) {
        console.error(error)
    }
}

function putNames(name, type, listOfMoves) {
    console.log(listOfMoves)

    maninContainer.innerHTML = `
    <article class="pokemon-card">
            <div>
                <h3>${name}</h3>
                <div class="pokemon-card__pokemon-img-container">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" alt="Charmander">
                </div>
                <div>
                    <h4>Type</h4>
                    <span>${type}</span>
                </div>
                <div>
                    <h4 class="pokemon-card__movementes-title">Movements</h4>
                    <ul class="pokemon-card__movements-list-container">

                    </ul>
                </div>
            </div>
        </article>   
    `
}


showPokemonData(`${API}`)
    .then(() => {
        for(let i = 1; i <= GLOBAL_RESEARCH; i++) {
            showPokemonData(`${API}/${i}`)
                .then((response) => putNames(response.name, response.types.map(e => e.type.name), response.moves.map(m => m.name)))
        }
    })