const STYLES = {
  APROBADO: 'bg-success-600/10 text-success-600',
  DEFAULT: 'bg-slate-400/15 text-slate-500',
};

export default function StatusBadge({ estatus }) {
  const cls = STYLES[estatus] ?? STYLES.DEFAULT;
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>
      {estatus || '—'}
    </span>
  );
}
