import { useNavigate } from 'react-router-dom';
import { usePosts } from '../core/hooks/usePosts';
import { useAuth } from '../core/hooks/useAuth';
import { PostEditor } from '../components/PostEditor';

export function Editor() {
  const { createPost } = usePosts();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-white">Nuevo post</h1>
        <button onClick={handleLogout} className="text-gray-400 hover:text-white">
          Cerrar sesión
        </button>
      </div>

      <PostEditor onSave={createPost} />
    </div>
  );
}