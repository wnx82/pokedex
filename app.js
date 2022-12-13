let allPokemon = [];
let tableauFin = [];
const searchInput = document.querySelector('.recherche-poke input');
const listePoke = document.querySelector('.liste-poke');
const chargement= document.querySelector('.loader');

const types = {
    grass: '#78c850',
    ground: '#E2BF65',
    dragon: '#6F35FC',
    fire: '#F58271',
    electric: '#F7D02C',
    fairy: '#D685AD',
    poison: '#966DA3',
    bug: '#B3F594',
    water: '#6390F0',
    normal: '#D9D5D8',
    psychic: '#F95587',
    flying: '#A98F33',
    fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#95D9D6'
};


function fetchPokemonBase() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(response => response.json())
        .then((allPoke) => {
            //console.log(allPoke);
            allPoke.results.forEach((pokemon) => {
                fetchPokemonComplet(pokemon);
            })
        })
}

fetchPokemonBase();

function fetchPokemonComplet(pokemon) {

    let objPokemonFull = {};
    let url = pokemon.url;
    let nameP = pokemon.name;


    fetch(url)
        .then(reponse => reponse.json())
        .then((pokeData) => {
            //console.log(pokeData)
            objPokemonFull.pic = pokeData.sprites.front_default;
            objPokemonFull.type = pokeData.types[0].type.name;
            objPokemonFull.id = pokeData.id;

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
                .then(reponse => reponse.json())
                .then((pokeData) => {
                    //console.log(pokeData);
                    objPokemonFull.name = pokeData.names[4].name;
                    allPokemon.push(objPokemonFull);
                    //console.log(allPokemon);
                    if (allPokemon.length === 151) {
                        //console.log('allPokemon.length' + allPokemon.length);

                        tableauFin = allPokemon.sort((a, b) => {
                            return a.id - b.id;
                        }).slice(0, 21);
                        //console.log(tableauFin);

                        createCard(tableauFin);

                        chargement.style.display = "none";
                    }
                })

        });
}


//création des cartes
function createCard(tableau) {
    for (let i = 0; i < tableau.length; i++) {
        const carte = document.createElement('li');
        let couleur = types[tableau[i].type];
        carte.style.background = couleur;
        const txtCarte = document.createElement('h5');
        txtCarte.innerText = tableau[i].name;
        const idCarte = document.createElement('p');
        idCarte.innerText = `ID# ${tableau[i].id}`;
        const imgCarte = document.createElement('img');
        imgCarte.src = tableau[i].pic;

        carte.appendChild(imgCarte);
        carte.appendChild(txtCarte);
        carte.appendChild(idCarte);

        listePoke.appendChild(carte);


    }
}


//Scroll infini

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    //scrolltop = scroll depuis le top
    //scrollHeight = scroll total
    //clientHeight = hauteur de la fenêtre, partie visible;
    //console.log(scrollTop, scrollHeight, clientHeight);

    if (clientHeight + scrollTop >= scrollHeight - 20) {
        addPoke(6);
    }

})

let index = 21;
function addPoke(nb) {
    if (index > 151) {
        return;
    }
    const arrToAdd = allPokemon.slice(index, index + nb);

    createCard(arrToAdd);
    index += nb;
}


//Recherche

searchInput.addEventListener('keyup', recherche);

// const formRecherche = document.querySelector('form');
// formRecherche.addEventListener('submit', (e) => {
//     e.preventDefault();
//     recherche();
// })

function recherche() {
    if (index < 151) {
        addPoke(130);
    }

    let filter, allLi, titleValue, AllTitles;
    filter = searchInput.value.toUpperCase();
    allLi = document.querySelectorAll('li');
    AllTitles = document.querySelectorAll('li > h5');

    for (i = 0; i < allLi.length; i++) {
        titleValue = AllTitles[i].innerText;

        if (titleValue.toUpperCase().indexOf(filter) > -1) {
            allLi[i].style.display = "flex";

        } else {
            allLi[i].style.display = "none";

        }
    }
}








// animation input
searchInput.addEventListener('input', function (e) {
    if (e.target.value !== "") {
        e.target.parentNode.classList.add('active-input');
    } else if (e.target === "") {
        e.target.parentNode.classList.remove('active-input');
    }
})


