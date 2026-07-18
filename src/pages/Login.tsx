import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../core/hooks/useAuth';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormDataEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/editor');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-serif text-white mb-8">Acceso privado</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900 p-8 rounded">
        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        {error && (
          <div className="bg-red-900 text-red-100 p-3 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-3 rounded font-bold transition"
        >
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}