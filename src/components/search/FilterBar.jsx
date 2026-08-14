import Select from '../common/Select';
import { PERIODOS } from '../../lib/periodos';
import { PAGO_OPCIONES } from '../../lib/pago';

export default function FilterBar({ filters, onChange, centros = [], programas = [] }) {
  const centroOptions = [
    { value: '0', label: '— Todos —' },
    ...centros.map((c) => ({ value: String(c.id), label: c.nombre })),
  ];
  const programaOptions = [
    { value: '0', label: '— Todos —' },
    ...programas.map((p) => ({ value: String(p.id), label: p.nombre })),
  ];

  return (
    <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Select
          label="Periodo"
          value={filters.periodo}
          onChange={(e) => onChange('periodo', e.target.value)}
          options={PERIODOS}
        />
        <Select
          label="Centro Docente"
          value={filters.centro}
          onChange={(e) => onChange('centro', e.target.value)}
          options={centroOptions}
        />
        <Select
          label="Programa Educativo"
          value={filters.programa}
          onChange={(e) => onChange('programa', e.target.value)}
          options={programaOptions}
        />
        <Select
          label="Apoyo económico"
          value={filters.pago}
          onChange={(e) => onChange('pago', e.target.value)}
          options={PAGO_OPCIONES}
        />
      </div>

      <div className="mt-4">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="M14 14l3 3" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={filters.query}
            onChange={(e) => onChange('query', e.target.value)}
            className="w-full rounded-md border border-line bg-white px-4 py-2.5 pl-9 text-sm
                       text-slate-700 placeholder:text-slate-400 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}
