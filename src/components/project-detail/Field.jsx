// Campo de solo lectura estilo "formulario", como en la página original de SICEI
// pero más limpio. Usa <textarea> readonly para textos largos.
export default function Field({ label, value, required = false, multiline = false, rows = 3 }) {
  const display = value === null || value === undefined || value === '' ? '—' : value;
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {required && <span className="text-red-500">* </span>}
        {label}
      </label>
      {multiline ? (
        <textarea
          readOnly
          rows={rows}
          value={display}
          className="resize-none rounded-md border border-line bg-sky-50 px-3 py-2 text-sm leading-relaxed text-slate-600 focus:outline-none"
        />
      ) : (
        <div className="rounded-md border border-line bg-sky-50 px-3 py-2 text-sm text-slate-600">
          {display}
        </div>
      )}
    </div>
  );
}
