import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import EntrenadorCard from "../componentes/EntrenadorCard";
import { fetchEntrenadores,deleteEntrenador } from "../services/entrenadoresService";

export default function EntrenadoresList() {
  const [entrenadores, setEntrenadores] = useState([]);

  const loadEntrenadores = () => {
    fetchEntrenadores()
      .then((data) => setEntrenadores(data))
      .catch(() => alert("Error obteniendo los entrenadores"));
  };

  useEffect(() => {
    loadEntrenadores();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este entrenador?")) return;
    await deleteEntrenador(id);
    loadEntrenadores();
  };

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
