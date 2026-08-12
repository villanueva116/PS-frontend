import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getCentrosDocentes = () => apiClient.get('/centros-docentes');

export const getProgramasEducativos = () => apiClient.get('/programas-educativos');

export const getProyectosVigentes = ({ centroDocenteId = 0, programaEducativoId = 0, fecha = '' }) =>
  apiClient.get('/proyectos/vigentes', {
    params: { centroDocenteId, programaEducativoId, fecha },
  });

export const getProyectoDetalle = ({ id, fecha = '' }) =>
  apiClient.get('/proyectos/detalle', {
    params: { id, fecha },
  });
