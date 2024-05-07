const name = document.querySelector('#inputBar')
const btn = document.querySelector('#searchButton')
const card = document.querySelector('#card')

let globalRes = null;



async function setInfo() {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.value}/`)
    globalRes = res;
    let statsHTML = ''
    let healthHTML = ''

    const statsNeeded = ['attack', 'defense', 'speed']

    res.data.stats.forEach(stat => {
        if (statsNeeded.includes(stat.stat.name)) {
            statsHTML += `
                <div class="stat">
                    <h4 id="stat-number">${stat.base_stat}</h4>
                    <h4>${stat.stat.name}</h4>
                </div>
            `
        }
    })

    res.data.stats.forEach(stat => {
        if(stat.stat.name === 'hp') {
            healthHTML += `
                <div id="health-div">
                    <h4 id="health-number"><span>HP</span> ${stat.base_stat}</h4>
                </div>
            `
        }
    })

    console.log(globalRes.data)
    card.innerHTML = `
        ${healthHTML}
        <img src="${res.data.sprites.other.dream_world.front_default}" alt="pokemon" id="pokemonImage">
        <h1>${res.data.name}</h1>
        <div id="stats">
            ${statsHTML}
        </div>
    `
}

btn.addEventListener('click', setInfo)