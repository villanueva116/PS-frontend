import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import FilterBar from '../../components/search/FilterBar';
import ResultsCount from '../../components/search/ResultsCount';
import ResultsTable from '../../components/search/ResultsTable';
import { getCentrosDocentes, getProgramasEducativos, getProyectosVigentes } from '../../api/projects.api';
import { PERIODO_DEFAULT } from '../../lib/periodos';

export default function SearchProjects() {
  // Los filtros viven en la URL (query params). Esto resuelve el problema
  // de que la búsqueda "se resetea": al volver del detalle, la URL conserva
  // los filtros, así que se restauran solos y no hay que reseleccionar nada.
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => ({
    periodo: searchParams.get('periodo') || PERIODO_DEFAULT,
    centro: searchParams.get('centro') || '0',
    programa: searchParams.get('programa') || '0',
    query: searchParams.get('q') || '',
  }), [searchParams]);

  const [centros, setCentros] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar catálogos una sola vez.
  useEffect(() => {
    getCentrosDocentes().then((res) => setCentros(res.data.data ?? [])).catch(() => setCentros([]));
    getProgramasEducativos().then((res) => setProgramas(res.data.data ?? [])).catch(() => setProgramas([]));
  }, []);

  // Traer proyectos cuando cambian periodo / centro / programa (no al teclear el nombre).
  const fetchProyectos = useCallback(() => {
    setLoading(true);
    setError(null);
    getProyectosVigentes({
      centroDocenteId: filters.centro,
      programaEducativoId: filters.programa,
      fecha: filters.periodo,
    })
      .then((res) => setProyectos(res.data.data ?? []))
      .catch(() => setError('No se pudieron cargar los proyectos. Verifica que el servidor esté encendido e intenta de nuevo.'))
      .finally(() => setLoading(false));
  }, [filters.centro, filters.programa, filters.periodo]);

  useEffect(() => { fetchProyectos(); }, [fetchProyectos]);

  // Actualizar un filtro = actualizar la URL.
  const handleChange = (key, value) => {
    const keyMap = { periodo: 'periodo', centro: 'centro', programa: 'programa', query: 'q' };
    const next = new URLSearchParams(searchParams);
    const paramKey = keyMap[key];
    if (value && value !== '0' && !(key === 'periodo' && value === PERIODO_DEFAULT)) {
      next.set(paramKey, value);
    } else {
      next.delete(paramKey);
    }
    setSearchParams(next, { replace: true });
  };

  // El filtro por nombre es en el cliente (rápido, sin nueva llamada).
  const visibles = proyectos.filter((p) =>
    (p.nombre || '').toLowerCase().includes(filters.query.toLowerCase())
  );

  // Query string que se pasa al detalle para poder "Regresar" con los mismos filtros.
  const detalleQuery = `?${searchParams.toString()}`;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-6 font-display text-2xl text-slate-700">Buscador de Proyectos</h1>

        <FilterBar filters={filters} onChange={handleChange} centros={centros} programas={programas} />

        {error && (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-6 flex items-center gap-2 rounded-md bg-sky-50 px-4 py-8 text-sm text-slate-500">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
            Cargando proyectos…
          </div>
        ) : (
          <>
            <ResultsCount count={visibles.length} />
            <ResultsTable proyectos={visibles} detalleQuery={detalleQuery} />
          </>
        )}
      </main>
    </div>
  );
}
