// Lógica de "servicio social pagado / no pagado".
//
// Criterio: un proyecto es PAGADO si su apoyo económico mensual (`monto`) es
// un número mayor que cero. 0, null, undefined o valores no numéricos => NO
// pagado. Se aísla aquí como función pura para poder probarlo sin la UI.

export function esPagado(proyecto) {
  const monto = Number(proyecto?.monto);
  return Number.isFinite(monto) && monto > 0;
}

// Opciones para el selector de la UI (y valores válidos del filtro).
export const PAGO_OPCIONES = [
  { value: 'todos', label: '— Todos —' },
  { value: 'si', label: 'Con apoyo económico' },
  { value: 'no', label: 'Sin apoyo económico' },
];

// Filtra una lista de proyectos según el valor del selector.
export function filtrarPorPago(proyectos, pago) {
  if (pago !== 'si' && pago !== 'no') return proyectos;
  const quiero = pago === 'si';
  return proyectos.filter((p) => esPagado(p) === quiero);
}

// Formatea el monto para mostrarlo en la tabla/detalle.
export function formatMonto(monto) {
  const n = Number(monto);
  if (!Number.isFinite(n) || n <= 0) return 'No pagado';
  return n.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
  });
}
