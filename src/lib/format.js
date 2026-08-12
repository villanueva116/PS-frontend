// Formatea una fecha ISO a algo legible tipo "31 dic 2026".
export function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Devuelve la primera unidad receptora legible de un proyecto.
export function unidadReceptoraDe(proyecto) {
  const u = proyecto?.unidadesReceptoras?.[0];
  return u?.unidadReceptora || u?.institucion || '—';
}
