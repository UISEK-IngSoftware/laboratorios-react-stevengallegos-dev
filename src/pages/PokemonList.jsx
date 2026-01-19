import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import PokemonCard from "../componentes/PokemonCard";
import { fetchPokemons, deletePokemon } from "../services/pokemonService";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  const loadPokemons = () => {
    fetchPokemons()
      .then((data) => setPokemons(data))
      .catch(() => alert("Error obteniendo los pokemons"));
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este Pokémon?")) return;
    await deletePokemon(id);
    loadPokemons();
  };

  return (
    <Grid container spacing={2} marginTop={2}>
      {pokemons.map((pokemon) => (
        <Grid key={pokemon.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <PokemonCard pokemon={pokemon} onDelete={handleDelete} />
        </Grid>
      ))}
    </Grid>
  );
}
