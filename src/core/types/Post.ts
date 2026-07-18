export interface Post {
  id: string;
  title: string;
  content: string;
  category: 'cuento' | 'poema';
  created_at: string;
  updated_at?: string;  // Hacer opcional
  author: string;
}