import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPokemon, fetchPokemonById, updatePokemon } from "../services/pokemonService";

export default function PokemonForm() {
  const navigate = useNavigate();
  const { id } = useParams();                 
  const isEdit = Boolean(id);                

  const [pokemonData, setPokemonData] = useState({
    name: "",
    tipo: "",
    weight: "",
    height: "",
    picture: null,
  });

  useEffect(() => {
    if (!isEdit) return;
    fetchPokemonById(id)
      .then((data) => {
        setPokemonData({
          name: data.name || "",
          tipo: data.tipo || "",
          weight: data.weight || "",
          height: data.height || "",
          picture: null,
        });
      })
      .catch(() => alert("Error cargando el pokemon"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      setPokemonData({ ...pokemonData, picture: files[0] });
    } else {
      setPokemonData({ ...pokemonData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // NUEVO: si es editar -> PUT, si no -> POST
      if (isEdit) {
        const updatedPokemon = await updatePokemon(id, pokemonData);
        alert("Pokemon actualizado exitosamente");
        console.log(updatedPokemon);
      } else {
        const newPokemon = await addPokemon(pokemonData);
        alert("Pokemon agregado exitosamente");
        console.log(newPokemon);
      }
      navigate("/");
    } catch (error) {
      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);
      console.log("HEADERS:", error?.response?.headers);
      alert("Error al guardar el pokemon"); 
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {isEdit ? "Editar Pokemon." : "Formulario de Pokemon."}  {/* NUEVO: solo cambia el texto */}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nombre" name="name" variant="outlined" onChange={handleChange} value={pokemonData.name} />
        <TextField select label="Tipo" name="tipo" variant="outlined" onChange={handleChange} value={pokemonData.tipo}>
        <MenuItem value="Eléctrico">Electrico</MenuItem>
        <MenuItem value="Agua">Agua</MenuItem>
        <MenuItem value="Fuego">Fuego</MenuItem>
        <MenuItem value="Planta">Planta</MenuItem>
        <MenuItem value="Tierra">Tierra</MenuItem>
        </TextField>
        <TextField label="Peso" name="weight" variant="outlined" onChange={handleChange} value={pokemonData.weight} />
        <TextField label="Altura" name="height" variant="outlined" onChange={handleChange} value={pokemonData.height} />
        <input type="file" name="picture" onChange={handleChange} />
        <Button variant="contained" type="submit">Guardar</Button>
      </Box>
    </>
  );
}
