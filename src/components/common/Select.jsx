export default function Select({ label, value, onChange, options = [], disabled = false }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full appearance-none rounded-md border border-line bg-white px-3 py-2.5 pr-9 text-sm
                     text-slate-700 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500
                     disabled:cursor-not-allowed disabled:bg-sky-50 disabled:text-slate-400"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"
        >
          <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
