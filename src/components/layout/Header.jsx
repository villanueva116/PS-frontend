import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-navy-900">
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-3 px-6">
        <Link to="/" className="flex items-center gap-3">
          {/* Reemplaza /logo.svg por el escudo oficial de UADY que tengas autorización de usar */}
          
          <span className="hidden font-display text-lg tracking-wide text-white sm:block">
            Buscador de Proyectos
          </span>
        </Link>
      </div>
    </header>
  );
}
