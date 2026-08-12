const TABS = [
  { id: 'generales', label: 'Datos Generales' },
  { id: 'proyecto', label: 'Datos del proyecto' },
  { id: 'perfiles', label: 'Perfiles' },
  { id: 'responsable', label: 'Responsable de Proyecto' },
];

export { TABS };

export default function ProjectTabs({ active, onSelect }) {
  return (
    <div className="border-b border-line">
      <nav className="-mb-px flex flex-wrap gap-1" role="tablist">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(tab.id)}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/40 ${
                isActive
                  ? 'border-cyan-500 text-navy-900'
                  : 'border-transparent text-slate-500 hover:text-navy-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
