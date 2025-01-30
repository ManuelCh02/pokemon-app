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

function putNames(name, type, listOfMoves, img) {
    const firstToUpperCase = () => name.charAt(0).toUpperCase() + name.slice(1)

    const article = document.createElement('article')
    article.classList.add('pokemon-card')
    article.innerHTML = `
        <div>
            <h3>${firstToUpperCase()}</h3>
            <div class="pokemon-card__pokemon-img-container">
                <img src=${img} alt=${firstToUpperCase()}>
            </div>
            <div class="pokemon-card__type-container">
                <h4>Type</h4>
                ${type.map(e => `<span class="pokemon-card__type-element">${e} </span>`).join('')}
            </div>
             <div>
                <h4 class="pokemon-card__movementes-title">Movements</h4>
                <ul class="pokemon-card__movements-list-container">
                    ${listOfMoves.map(move => `<li>${move}</li>`).join('')}
                </ul>
            </div>
        </div>`
    maninContainer.append(article)
}

const askForListOfMoves = response => response.moves.map(element => element.move.name).slice(0, 5)

showPokemonData(`${API}`)
    .then(() => {
        for(let i = 1; i <= GLOBAL_RESEARCH; i++) {
            showPokemonData(`${API}/${i}`)
                .then((response) => putNames(response.name, response.types.map(e => e.type.name), askForListOfMoves(response), response.sprites.front_default))
        }
    })
