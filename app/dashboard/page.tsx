'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Post = {
  id: string
  titulo: string
  descricao: string
  foto_url: string | null
  created_at: string
}

export default function FeedPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) setPosts(data)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Posts</h1>
          <p className="text-slate-400 text-sm mt-1">
            {posts.length} {posts.length === 1 ? 'post publicado' : 'posts publicados'}
          </p>
        </div>
        <Link
          href="/posts/novo"
          className="bg-[#2979ff] hover:bg-[#1c6ae6] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          + Criar Post
        </Link>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 rounded-2xl h-64 animate-pulse border border-white/10" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
            <span className="text-3xl">✂️</span>
          </div>
          <p className="text-white font-medium">Nenhum post ainda</p>
          <p className="text-slate-400 text-sm mt-1">Crie seu primeiro post para aparecer aqui</p>
          <Link
            href="/posts/novo"
            className="mt-4 bg-[#2979ff] hover:bg-[#1c6ae6] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            Criar primeiro post
          </Link>
        </div>
      )}

      {/* Grid de posts */}
      {!loading && posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#2979ff]/50 hover:bg-white/[0.07] transition-all cursor-pointer group">

                {/* Foto */}
                <div className="w-full h-48 bg-white/5 relative overflow-hidden">
                  {post.foto_url ? (
                    <img
                      src={post.foto_url}
                      alt={post.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="p-4">
                  <h2 className="text-white font-semibold text-sm leading-tight line-clamp-1">
                    {post.titulo}
                  </h2>
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                    {post.descricao}
                  </p>
                  <p className="text-slate-600 text-xs mt-3">
                    {new Date(post.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}