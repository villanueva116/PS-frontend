import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import ProjectTabs, { TABS } from '../../components/project-detail/ProjectTabs';
import StatusBadge from '../../components/project-detail/StatusBadge';
import Button from '../../components/common/Button';
import TabGenerales from '../../components/project-detail/tabs/TabGenerales';
import TabProyecto from '../../components/project-detail/tabs/TabProyecto';
import TabPerfiles from '../../components/project-detail/tabs/TabPerfiles';
import TabResponsable from '../../components/project-detail/tabs/TabResponsable';
import { getProyectoDetalle } from '../../api/projects.api';
import { PERIODO_DEFAULT } from '../../lib/periodos';

export default function ProjectDetail() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const fecha = searchParams.get('periodo') || PERIODO_DEFAULT;
  const activeTab = searchParams.get('tab') || 'generales';

  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProyectoDetalle({ id, fecha })
      .then((res) => setProyecto(res.data.data))
      .catch((e) => {
        setError(
          e.response?.status === 404
            ? 'No se encontró este proyecto en el periodo seleccionado.'
            : 'No se pudo cargar el detalle del proyecto. Intenta de nuevo.'
        );
      })
      .finally(() => setLoading(false));
  }, [id, fecha]);

  // Cambiar de pestaña = actualizar la URL (así no se pierde al recargar/compartir).
  const setTab = (tab) => {
    const next = new URLSearchParams(searchParams);
    next.set('tab', tab);
    setSearchParams(next, { replace: true });
  };

  // Para "Regresar", conservamos los filtros de búsqueda (todo menos 'tab').
  const backParams = new URLSearchParams(searchParams);
  backParams.delete('tab');
  const backTo = `/?${backParams.toString()}`;

  const currentIndex = TABS.findIndex((t) => t.id === activeTab);
  const prevTab = currentIndex > 0 ? TABS[currentIndex - 1].id : null;
  const nextTab = currentIndex < TABS.length - 1 ? TABS[currentIndex + 1].id : null;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl text-slate-700">Solicitud de Registro de Proyecto</h1>
          {proyecto && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-xs text-slate-500">
              Estatus: <StatusBadge estatus={proyecto.estatus} />
            </div>
          )}
        </div>

        {loading && (
          <div className="flex items-center gap-2 rounded-md bg-sky-50 px-4 py-8 text-sm text-slate-500">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
            Cargando detalle…
          </div>
        )}

        {error && !loading && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
            <div className="mt-3">
              <Link to={backTo} className="text-cyan-600 underline">← Regresar al buscador</Link>
            </div>
          </div>
        )}

        {proyecto && !loading && (
          <>
            <ProjectTabs active={activeTab} onSelect={setTab} />

            <div className="py-6">
              <h2 className="mb-5 font-display text-lg text-navy-900">
                {TABS.find((t) => t.id === activeTab)?.label}
              </h2>

              {activeTab === 'generales' && <TabGenerales p={proyecto} />}
              {activeTab === 'proyecto' && <TabProyecto p={proyecto} />}
              {activeTab === 'perfiles' && <TabPerfiles p={proyecto} />}
              {activeTab === 'responsable' && <TabResponsable p={proyecto} />}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 border-t border-line pt-6">
              {prevTab && (
                <Button variant="ghost" onClick={() => setTab(prevTab)}>
                  ‹ Anterior
                </Button>
              )}
              {nextTab && (
                <Button variant="ghost" onClick={() => setTab(nextTab)}>
                  Siguiente ›
                </Button>
              )}
            </div>

            <div className="mt-4 flex justify-center">
              <Link
                to={backTo}
                className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-sky-50"
              >
                ← Regresar a buscador de proyectos
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
