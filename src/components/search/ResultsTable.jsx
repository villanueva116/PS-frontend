import { Link } from 'react-router-dom';
import { formatDate, unidadReceptoraDe } from '../../lib/format';
import StatusBadge from '../project-detail/StatusBadge';

export default function ResultsTable({ proyectos, detalleQuery }) {
  if (proyectos.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-dashed border-line bg-sky-50 px-6 py-12 text-center">
        <p className="text-sm text-slate-500">
          No hay proyectos que coincidan con los filtros seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead className="bg-sky-100 text-slate-700">
          <tr>
            <th className="px-4 py-3 font-mono text-xs uppercase tracking-wide">ID</th>
            <th className="px-4 py-3 font-medium">Nombre</th>
            <th className="px-4 py-3 font-medium">Unidad Receptora</th>
            <th className="px-4 py-3 font-medium">Ámbito</th>
            <th className="px-4 py-3 font-medium">Estatus</th>
            <th className="px-4 py-3 font-medium">Fin Vigencia</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {proyectos.map((p) => (
            <tr
              key={p.id}
              className="border-l-4 border-l-transparent transition-colors hover:border-l-cyan-500 hover:bg-sky-100/40"
            >
              <td className="px-4 py-4 align-top font-mono text-xs text-slate-400">{p.id}</td>
              <td className="max-w-md px-4 py-4 align-top leading-relaxed text-slate-700">{p.nombre}</td>
              <td className="px-4 py-4 align-top text-slate-500">{unidadReceptoraDe(p)}</td>
              <td className="px-4 py-4 align-top text-slate-500">{p.ambito || '—'}</td>
              <td className="px-4 py-4 align-top"><StatusBadge estatus={p.estatus} /></td>
              <td className="px-4 py-4 align-top text-slate-500">{formatDate(p.finVigencia)}</td>
              <td className="px-4 py-4 align-top">
                <Link
                  to={`/proyectos/${p.id}${detalleQuery}`}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-cyan-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="10" cy="10" r="2" />
                  </svg>
                  Ver solicitud
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
