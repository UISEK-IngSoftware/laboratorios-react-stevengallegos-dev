import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function EntrenadorCard({ entrenador, onDelete }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;

  let image = "https://via.placeholder.com/300";
  if (entrenador.foto) {
    image = entrenador.foto.startsWith("data:image")
      ? entrenador.foto
      : `${mediaUrl}/${entrenador.foto.replace(/^\/+/, "").replace(/^media\/?/, "")}`;
  }

  return (
    <Card>
      <CardMedia component="img" sx={{ height: 200, objectFit: "contain" }} image={image} alt={entrenador.nombre} />
      <CardContent>
        <Typography variant="h5">{entrenador.nombre} {entrenador.apellido}</Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", gap: 1 }}>
        <IconButton color="primary" onClick={() => navigate(`/entrenador/${entrenador.id}`)}>
          <VisibilityIcon />
        </IconButton>

        {isLoggedIn && (
          <>
            <IconButton color="primary" onClick={() => navigate(`/edit-entrenador/${entrenador.id}`)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(entrenador.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}
