import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { type Post } from '../core/types/Post';

interface Props {
  onSave: (post: Omit<Post, 'id' | 'created_at'>) => Promise<void>;
}

export function PostEditor({ onSave }: Props) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'cuento' | 'poema'>('cuento');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '<p>Comienza a escribir...</p>',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !editor?.getHTML()) {
      alert('Completa título y contenido');
      return;
    }

    setLoading(true);
    try {
      await onSave({
        title,
        content: editor.getHTML(),
        category,
        author: 'Emiliano',
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setTitle('');
      editor.commands.setContent('<p></p>');
    } catch (error) {
      alert('Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  if (!editor) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 p-8 rounded-lg">
      {success && (
        <div className="bg-green-900 text-green-100 p-3 rounded">
          ✓ Post publicado
        </div>
      )}

      <div>
        <label className="block text-gray-300 mb-2">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del cuento o poema"
          className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Categoría</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as 'cuento' | 'poema')}
          className="w-full bg-slate-800 text-white p-3 rounded border border-slate-700"
        >
          <option value="cuento">Cuento</option>
          <option value="poema">Poema</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-300 mb-2">Contenido</label>
        <div className="flex flex-wrap gap-1 bg-slate-800 p-3 rounded border border-slate-700">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm font-bold"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm font-bold"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm font-bold"
          >
            U
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm font-bold"
          >
            S
          </button>
        </div>
      </div>

      <div className="bg-slate-800 p-4 rounded min-h-96 border border-slate-700">
        <EditorContent editor={editor} className="prose prose-invert max-w-none" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-3 rounded font-bold transition"
      >
        {loading ? 'Publicando...' : 'Publicar'}
      </button>
    </form>
  );
}