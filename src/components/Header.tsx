import { Link } from 'react-router-dom';
import { useAuth } from '../core/hooks/useAuth';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-slate-900 border-b border-slate-800">
      <nav className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold text-white hover:opacity-80 transition">
          Narrativa
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="text-gray-400 hover:text-white transition">
            Home
          </Link>
          {user && (
            <Link to="/editor" className="text-gray-400 hover:text-white transition">
              Escribir
            </Link>
          )}
          {!user && (
            <Link to="/login" className="text-gray-400 hover:text-white transition">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}