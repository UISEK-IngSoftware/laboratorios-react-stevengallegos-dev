import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function PokemonCard({ pokemon, onDelete }) {
  const navigate = useNavigate();
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;
  const isLoggedIn = localStorage.getItem("access_token") !== null;

  const image = `${mediaUrl}/${pokemon.picture}`;

  return (
    <Card>
      <CardMedia component="img" sx={{ height: 150, objectFit: "contain" }} image={image} alt={pokemon.name} />
      <CardContent>
        <Typography variant="h5">{pokemon.name}</Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", gap: 1 }}>
        <IconButton color="primary" onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
          <VisibilityIcon />
        </IconButton>

        {isLoggedIn && (
          <>
            <IconButton color="primary" onClick={() => navigate(`/edit-pokemon/${pokemon.id}`)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(pokemon.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}
