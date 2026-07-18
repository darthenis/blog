import { Link } from 'react-router-dom';
import { type Post } from '../core/types/Post';

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  const preview = post.content
    .replace(/<[^>]*>/g, '') // Elimina tags HTML
    .substring(0, 200) + '...';

  return (
    <Link to={`/posts/${post.id}`}>
      <article className="border-l-4 border-blue-600 pl-6 pb-8 hover:opacity-80 transition cursor-pointer">
        <h2 className="text-2xl font-serif text-white mb-2">{post.title}</h2>
        
        <div className="flex justify-between text-gray-400 text-sm mb-4">
          <span>{post.category}</span>
          <span>{new Date(post.created_at).toLocaleDateString('es-AR')}</span>
        </div>
        
        <p className="text-gray-300 line-clamp-3">{preview}</p>
      </article>
    </Link>
  );
}