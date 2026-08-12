export default function TabPerfiles({ p }) {
  const perfiles = p.perfils || [];

  if (perfiles.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line bg-sky-50 px-6 py-10 text-center text-sm text-slate-500">
        Este proyecto no tiene perfiles registrados.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-sky-100 text-slate-700">
          <tr>
            <th className="px-4 py-3 font-medium">Licenciatura</th>
            <th className="px-4 py-3 font-medium">No. de prestadores</th>
            <th className="px-4 py-3 font-medium">Tareas</th>
            <th className="px-4 py-3 font-medium">Responsable de prestadores</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {perfiles.map((perfil, i) => {
            const responsable = perfil.respDePrestadors?.[0];
            const tareas = (perfil.actividads || []).map((a) => a.nombre).filter(Boolean).join(', ');
            return (
              <tr key={perfil.id ?? i} className="align-top">
                <td className="px-4 py-4 text-slate-700">
                  {perfil.programaEducativo?.nombre || '—'}
                </td>
                <td className="px-4 py-4 text-slate-500">{perfil.solicitados ?? '—'}</td>
                <td className="max-w-lg px-4 py-4 leading-relaxed text-slate-600">
                  {tareas || '—'}
                </td>
                <td className="px-4 py-4 text-slate-600">
                  {responsable
                    ? (
                      <div>
                        <p className="font-medium text-slate-700">
                          {[responsable.nombres, responsable.primerApellido, responsable.segundoApellido]
                            .filter(Boolean)
                            .join(' ') || '—'}
                        </p>
                        <p className="text-xs text-slate-500">{responsable.cargo}</p>
                        <p className="text-xs text-slate-500">{responsable.email}</p>
                      </div>
                    )
                    : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
