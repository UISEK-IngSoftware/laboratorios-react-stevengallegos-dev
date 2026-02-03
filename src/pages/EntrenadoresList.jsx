import { useEffect, useState } from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import EntrenadorCard from "../componentes/EntrenadorCard";
import { fetchEntrenadores, deleteEntrenador } from "../services/entrenadoresService";

export default function EntrenadoresList() {
  const [entrenadores, setEntrenadores] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEntrenadores = () => {
    setLoading(true);
    fetchEntrenadores()
      .then((data) => setEntrenadores(data))
      .catch(() => alert("Error obteniendo los entrenadores"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEntrenadores();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este entrenador?")) return;
    await deleteEntrenador(id);
    loadEntrenadores();
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Grid container spacing={2} marginTop={2}>
      {entrenadores.map((entrenador) => (
        <Grid key={entrenador.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <EntrenadorCard
            entrenador={entrenador}
            onDelete={handleDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
}
