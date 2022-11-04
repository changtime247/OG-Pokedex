import { useEffect, useState } from 'react'
import './styles.css'
import {
  getPokemonList,
  getPokemonDescription,
  capitalizeFirstLetter,
} from './utils'

export default function App() {
  const [list, setPokemonList] = useState(null)
  const [selectedPokemon, setSelectedPokemon] = useState(1)
  const [description, setDescription] = useState('')
  const [frontMode, setFrontMode] = useState(true)

  function handleSelect(e) {
    console.log(e.target.value)
    setSelectedPokemon(e.target.value)
  }

  useEffect(() => {
    async function getList() {
      try {
        const list = await getPokemonList()
        // list.sort((a, b) => a.name.localeCompare(b.name))
        setPokemonList(list)
        const description = await getPokemonDescription(selectedPokemon)
        setDescription(description)
        console.log(description)
      } catch (e) {
        console.log(e)
      }
    }
    getList()
  }, [selectedPokemon])

  function togglePokemon(id) {
    if (id === 0) {
      setSelectedPokemon(Number(selectedPokemon) - 1)
    }
    if (id === 1) {
      setSelectedPokemon(Number(selectedPokemon) + 1)
    }
    setDescription(description)
  }

  return (
    <>
      {/* <div className='container'> */}
      <div className='App card'>
        <div className='card-image-container'>
          <img
            src={
              frontMode
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon}.png`
                : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${selectedPokemon}.png`
            }
            alt='pokemon'
            style={{}}
            onClick={() => setFrontMode((prevMode) => !prevMode)}
          />
          <div className='card-content'>
            {description}
            <select
              onChange={handleSelect}
              value={selectedPokemon}
              className='select-btn card-content-child'
            >
              {list?.map((pokemon, index) => (
                <option key={index + 1} value={index + 1}>
                  {capitalizeFirstLetter(pokemon.name)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='controls'>
          <button
            className='video-game-button'
            disabled={selectedPokemon === 1}
            onClick={() => togglePokemon(0)}
          >
            &larr;
          </button>

          <button
            className='video-game-button'
            disabled={selectedPokemon === list?.length - 1}
            onClick={() => togglePokemon(1)}
          >
            &rarr;
          </button>
        </div>
        <div id='logo'>
          <img
            src='https://pluspng.com/img-png/pokemon-logo-png-pokemon-logo-png-2000.png'
            alt='pokemon logo'
          ></img>
        </div>
        <div className='gameboy speakers'></div>
      </div>
      {/* </div> */}
    </>
  )
}
