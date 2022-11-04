export async function getPokemonList() {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    console.log(res)
    // res = sortTheListABC(res)
    const data = await res.json()
    return data.results
  } catch (err) {
    console.log(err)
  }
}

export async function getPokemonDescription(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    console.log(res)
    // res = sortTheListABC(res)
    const data = await res.json()
    return data.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, ' ')
  } catch (err) {
    console.log(err)
  }
}

export function getPokemonSpriteUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
}

export function capitalizeFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1)
}

