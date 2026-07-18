import { PostCard } from '../components/PostCard';
import { usePosts } from '../core/hooks/usePosts';
import type { Post } from '../core/types/Post';

export function Home() {
  const { posts, loading } = usePosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-serif font-bold text-white mb-12">Narrativa</h1>
      
      {loading && <p>Cargando...</p>}
      
      <div className="space-y-8">
        {posts.map((post : Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}