// Genera dinámicamente todos los periodos semestrales desde 2005 hasta
// el semestre actual + 1, sin tener que listarlos a mano.
//
// Convención UADY: dos semestres al año.
//   - Ene–Jun  → fecha de corte 30 jun (fin de vigencia)
//   - Jul–Dic  → fecha de corte 31 dic
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function construirPeriodos() {
  const periodos = [];
  const START_YEAR = 2005;

  const now = new Date();
  const currentYear = now.getFullYear();
  // Semestre actual: 1 si estamos ene-jun, 2 si jul-dic.
  const currentSem = now.getMonth() < 6 ? 1 : 2;

  for (let year = START_YEAR; year <= currentYear + 1; year++) {
    for (let sem = 1; sem <= 2; sem++) {
      // No pasarse del semestre actual + 1.
      if (year === currentYear + 1 && sem > currentSem) break;
      if (year > currentYear && sem > currentSem) break;

      if (sem === 1) {
        periodos.push({
          value: `${year}-06-30T23:59:00-06:00`,
          label: `1 ene ${year} - 30 jun ${year}`,
          sortKey: year * 10 + 1,
        });
      } else {
        periodos.push({
          value: `${year}-12-31T23:59:00-06:00`,
          label: `1 jul ${year} - 31 dic ${year}`,
          sortKey: year * 10 + 2,
        });
      }
    }
  }

  // Más reciente primero.
  return periodos.sort((a, b) => b.sortKey - a.sortKey);
}

export const PERIODOS = construirPeriodos();

export const PERIODO_DEFAULT = PERIODOS[0].value;

export function labelDePeriodo(value) {
  return PERIODOS.find((p) => p.value === value)?.label ?? PERIODOS[0].label;
}