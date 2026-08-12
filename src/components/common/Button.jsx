export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-60';
  const variants = {
    primary: 'bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600',
    ghost: 'border border-line bg-white px-4 py-2 text-slate-700 hover:bg-sky-50',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
