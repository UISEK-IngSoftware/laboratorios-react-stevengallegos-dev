import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPokemonById } from "../services/pokemonService";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

export default function PokemonDetalle() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;

  useEffect(() => {
    fetchPokemonById(id).then(setPokemon).catch(console.error);
  }, [id]);

  if (!pokemon) return <p>Cargando...</p>;

  const image = pokemon.picture ? `${mediaUrl}/${pokemon.picture}` : "https://via.placeholder.com/300";

  return (
    <Card sx={{ maxWidth: 700, mx: "auto", mt: 3 }}>
      <CardMedia component="img" image={image} sx={{ height: 220, objectFit: "contain" }} />
      <CardContent>
        <Typography variant="h4" sx={{ mb: 1 }}>{pokemon.name ?? "Sin nombre"}</Typography>

        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          <li><Typography>Nombre: {pokemon.name ?? "-"}</Typography></li>
          <li><Typography>Tipo: {pokemon.tipo ?? "-"}</Typography></li>
          <li><Typography>Peso: {pokemon.weight ?? "-"}</Typography></li>
          <li><Typography>Altura: {pokemon.height ?? "-"}</Typography></li>
        </Box>
      </CardContent>
    </Card>
  );
}
