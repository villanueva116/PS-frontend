import { Routes, Route, Navigate } from 'react-router-dom';
import SearchProjects from '../pages/SearchProjects/SearchProjects';
import ProjectDetail from '../pages/ProjectDetail/ProjectDetail';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchProjects />} />
      <Route path="/proyectos/:id" element={<ProjectDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
