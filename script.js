
const types = [
    'fire',
    'grass',
    'electric',
    'water',
    'ground',
    'rock',
    'fairy',
    'poison',
    'bug',
    'dragon',
    'psychic',
    'flying',
    'fighting',
    'normal',
];

const POKEMON_COUNT = 150;

const cardHtml = `
    <div class="card" id="card-{id}">
        <div class="title">
            <h2>{name}</h2>
            <small># {id}</small>
        </div>
        <div class="img bg-{type}">
            <img src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/{id}.svg" alt="{name}" width="226px" height="218px"/>
        </div>
        <div class="type {type}">
            <p>{type}</p>
        </div>
        <button class="favorite" data-id={id}>
            <div class="heart">
            </div>
        </button>
    </div>
    `;

const cards = document.querySelector('.cards');

const getType = (data) => {
    const apiTypes = data.map(type=> type.type.name);
    const type = types.find((type) => apiTypes.indexOf(type) > -1);
    return type;
}

const fetchPokemon = async (number) => {
    if (number === undefined) return;
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
    const response = await fetch(url).then((response) => response.json());
    const {id, name, types} = response;

    const type = getType(types);

    return { id, name, type };
}

const replacer = (text, source, destination) => {
    const regex = new RegExp(source, 'gi');
    return text.replace(regex, destination);
}

const createPokemonCard = (pokemon) => {

    const {id, name, type} = pokemon;

    let  newCard = replacer(cardHtml, `\{id\}`, id);
    newCard = replacer(newCard, `\{name\}`, name);
    newCard = replacer(newCard, `\{type\}`, type);

    cards.innerHTML += newCard;

}

const fetchPokemons = async () => {

    for (let i = 1; i <= POKEMON_COUNT; i++) {
    
        const pokemon = await fetchPokemon(i);
        createPokemonCard(pokemon);
    }

}

fetchPokemons();


 
 //Exemplo para clonar objetos
    /*const cards = document.querySelector('.cards');
    const card  = document.querySelector('.card');

    for(let i = 0; i < 11; i++) {
        const clone = card.cloneNode(true);
        cards.appendChild(clone);
    }


    //Exemplo gerar css com javascript
    const colors = {
        fire: '#e4604d',
        grass: '#9dd465',
        electric: '#f9e45f',
        water: '#6a83d6',
        ground: '#e4c967',
        rock: '#cabb7b',
        fairy: '#eeb2fa',
        poison: '#9f619d',
        bug: '#c5cf4a',
        dragon: '#857af7',
        psychic: '#e56eaf',
        flying: '#80a4f9',
        fighting: '#9b5a48',
        normal: '#bab8ab'
    };

    const variables = [];
    const style = [];

    for (let key in colors) {

        variables.push(`--${key}: ${colors[key]};\n`);

        const css = `
            .bg-${key} {
                background: linear-gradient(to top right, var(--${key}), var(--card-bg) 25%);
            }

            .${key} {
                background-color: var(--${key});
            }
        `;

        style.push(css);   
    }

    console.log(variables.join(''));

    console.log(style.join(''));*/