export default function ResultsCount({ count }) {
  return (
    <div className="mt-6 rounded-md bg-sky-100 px-4 py-3 text-sm text-navy-900">
      Resultados: <span className="font-semibold">{count}</span>
    </div>
  );
}
