import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* Obtener entrenadores */
export async function fetchEntrenadores() {
  const response = await axios.get(`${API_BASE_URL}/entrenadores/`);
  return response.data;
}

/* Convertir archivo a Base64 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); 
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* Crear entrenador */
export async function addEntrenador(entrenadorData) {
  const payload = { ...entrenadorData };

  if (entrenadorData.foto instanceof File) {
    payload.foto = await fileToBase64(entrenadorData.foto);
  }

  const response = await axios.post(`${API_BASE_URL}/entrenadores/`, payload);
  return response.data;
}

/* Obtener entrenador por ID */
export async function fetchEntrenadorById(id) {
  const response = await axios.get(`${API_BASE_URL}/entrenadores/${id}/`);
  return response.data;
}

/* Actualizar entrenador */
export async function updateEntrenador(id, entrenadorData) {
  const payload = { ...entrenadorData };

  if (entrenadorData.foto instanceof File) {
    payload.foto = await fileToBase64(entrenadorData.foto);
  } else {
    delete payload.foto; // no cambiar foto
  }

  const response = await axios.patch(`${API_BASE_URL}/entrenadores/${id}/`, payload);
  return response.data;
}

/* Eliminar entrenador */
export async function deleteEntrenador(id) {
  await axios.delete(`${API_BASE_URL}/entrenadores/${id}/`);
}
