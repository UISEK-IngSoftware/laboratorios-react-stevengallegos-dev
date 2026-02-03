import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addEntrenador, fetchEntrenadorById, updateEntrenador } from "../services/entrenadoresService";
import Spinner from "../componentes/Spinner";

export default function EntrenadoresForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [entrenadorData, setEntrenadorData] = useState({
    nombre: "",
    apellido: "",
    nivel: "",
    fecha_nacimiento: "",
    foto: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    setLoading(true);
    fetchEntrenadorById(id)
      .then((data) => {
        setEntrenadorData({
          nombre: data.nombre || "",
          apellido: data.apellido || "",
          nivel: data.nivel || "",
          fecha_nacimiento: data.fecha_nacimiento || "",
          foto: null,
        });
      })
      .catch(() => alert("Error cargando el entrenador"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setEntrenadorData({ ...entrenadorData, foto: files[0] });
    } else {
      setEntrenadorData({ ...entrenadorData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEdit) {
        await updateEntrenador(id, entrenadorData);
        alert("Entrenador actualizado exitosamente");
      } else {
        await addEntrenador(entrenadorData);
        alert("Entrenador agregado exitosamente");
      }
      navigate("/entrenadores");
    } catch {
      alert("Error al guardar el entrenador");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {isEdit ? "Editar Entrenador." : "Formulario de Entrenador."}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nombre" name="nombre" onChange={handleChange} value={entrenadorData.nombre} />
        <TextField label="Apellido" name="apellido" onChange={handleChange} value={entrenadorData.apellido} />
        <TextField label="Nivel" name="nivel" type="number" onChange={handleChange} value={entrenadorData.nivel} />
        <TextField
          label="Fecha de nacimiento"
          name="fecha_nacimiento"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          value={entrenadorData.fecha_nacimiento}
        />
        <input type="file" name="foto" onChange={handleChange} />

        <Button variant="contained" type="submit">
          Guardar
        </Button>
      </Box>
    </>
  );
}
