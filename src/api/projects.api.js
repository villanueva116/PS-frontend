import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getCentrosDocentes = () => apiClient.get('/centros-docentes');

export const getProgramasEducativos = () => apiClient.get('/programas-educativos');

export const getProyectosVigentes = ({ centroDocenteId = 0, programaEducativoId = 0, fecha = '', pagado }) =>
  apiClient.get('/proyectos/vigentes', {
    // `pagado` solo se envía si es 'si' o 'no' (el backend lo revalida igual).
    params: {
      centroDocenteId,
      programaEducativoId,
      fecha,
      ...(pagado === 'si' || pagado === 'no' ? { pagado } : {}),
    },
  });

export const getProyectoDetalle = ({ id, fecha = '' }) =>
  apiClient.get('/proyectos/detalle', {
    params: { id, fecha },
  });
