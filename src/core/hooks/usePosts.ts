import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { type Post } from '../types/Post';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();

    const channel = supabase
      .channel('posts-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setPosts((p) => [payload.new as Post, ...p]);
          }
        }
      )
      .subscribe();

    return () => channel.unsubscribe();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }

  async function createPost(post: Omit<Post, 'id' | 'created_at'>) {
    const { data } = await supabase
      .from('posts')
      .insert([post])
      .select()
      .single();
    return data;
  }

  return { posts, loading, createPost };
}