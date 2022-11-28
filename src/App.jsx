// Icons
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";

// components
import { Button } from "./components/Button";
import { Card } from "./components/Card";

// Styles
import "./sass/App.scss";

//  Hooks
import { useState, useEffect } from "react";

const App = () => {
  const [evoPokemon, setEvoPokemon] = useState([]);
  const [pokemonId, setPokemonId] = useState(1);
  useEffect(() => {
    evoluciones(pokemonId);
  }, [pokemonId]);

  async function evoluciones(id) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/evolution-chain/${id}/`
    );
    const data = await response.json();

    let pokemonEvoArray = [];

    let pokemonlv1 = data.chain.species.name;
    let imagenPokemonlv1 = await getPokemonNames(pokemonlv1);

    pokemonEvoArray.push([pokemonlv1, imagenPokemonlv1]);

    if (data.chain.evolves_to.length) {
      let pokemonlv2 = data.chain.evolves_to[0].species.name;
      let imagenPokemonlv2 = await getPokemonNames(pokemonlv2);

      pokemonEvoArray.push([pokemonlv2, imagenPokemonlv2]);

      if (data.chain.evolves_to[0].evolves_to.length) {
        let pokemonlv3 = data.chain.evolves_to[0].evolves_to[0].species.name;
        let imagenPokemonlv3 = await getPokemonNames(pokemonlv3);

        pokemonEvoArray.push([pokemonlv3, imagenPokemonlv3]);
        setEvoPokemon(pokemonEvoArray);
      }
    }
  }

  async function getPokemonNames(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await response.json();
    return data.sprites.other.dream_world.front_default;
  }

  function restarId() {
    if (pokemonId > 1) {
      setPokemonId(pokemonId - 1);
    }
  }
  function sumarId() {
    setPokemonId(pokemonId + 1);
  }

  return (
    <>
      <div className="card_container">
        {evoPokemon.map((pokemon) => (
          <Card 
          key={pokemon[0]}
          name={pokemon[0]}
          img={pokemon[1]} />
        ))}
      </div>
      <div className="btn_content">
        <Button icon={<TiArrowLeftOutline />} handleClick={restarId} />

        <Button icon={<TiArrowRightOutline />} handleClick={sumarId} />
      </div>
    </>
  );
};

export { App };
