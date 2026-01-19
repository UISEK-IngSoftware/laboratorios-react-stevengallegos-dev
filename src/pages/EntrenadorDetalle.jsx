import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchEntrenadorById } from "../services/entrenadoresService";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

export default function EntrenadorDetalle() {
  const { id } = useParams();
  const [entrenador, setEntrenador] = useState(null);
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;

  useEffect(() => {
    fetchEntrenadorById(id).then(setEntrenador);
  }, [id]);

  if (!entrenador) return <p>Cargando...</p>;

  const image = entrenador.foto
    ? entrenador.foto.startsWith("data:image")
      ? entrenador.foto
      : `${mediaUrl}/${entrenador.foto.replace(/^\/+/, "").replace(/^media\/?/, "")}`
    : "https://via.placeholder.com/300";

  return (
    <Card sx={{ maxWidth: 700, mx: "auto", mt: 3 }}>
      <CardMedia
        component="img"
        image={image}
        sx={{ height: 220, objectFit: "contain" }}
      />

      <CardContent>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {entrenador.nombre} {entrenador.apellido}
        </Typography>

        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          <li><Typography>Nombre: {entrenador.nombre}</Typography></li>
          <li><Typography>Apellido: {entrenador.apellido}</Typography></li>
          <li><Typography>Nivel: {entrenador.nivel}</Typography></li>
          <li><Typography>Fecha nacimiento: {entrenador.fecha_nacimiento}</Typography></li>
        </Box>
      </CardContent>
    </Card>
  );
}
