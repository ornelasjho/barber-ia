'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function NovoPost() {
  const router = useRouter()
  

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [foto, setFoto] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFoto(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (!user) {
      alert('Usuário não logado! Erro: ' + userError?.message)
      setLoading(false)
      return
    }

    let foto_url = null

    if (foto) {
      const ext = foto.name.split('.').pop()
      const path = `${user.id}/${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('posts')
        .upload(path, foto)

      if (uploadError) {
        alert('Erro ao enviar foto: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data } = supabase.storage.from('posts').getPublicUrl(path)
      foto_url = data.publicUrl
    }

    const { error } = await supabase.from('posts').insert({
      user_id: user.id,
      titulo,
      descricao,
      foto_url,
    })

    if (error) {
      alert('Erro ao salvar: ' + error.message)
      setLoading(false)
      return
    }

    alert('Post publicado com sucesso!')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#1a1d2e] rounded-2xl p-8 border border-[#2a2d3e]">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">✦</span>
          </div>
          <h1 className="text-xl font-semibold text-white">Criar Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              required
              className="w-full bg-[#0f1117] border border-[#2a2d3e] rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-blue-500 transition"
              placeholder="Ex: Corte degradê moderno"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Descrição</label>
            <textarea
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              rows={3}
              className="w-full bg-[#0f1117] border border-[#2a2d3e] rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-blue-500 transition resize-none"
              placeholder="Descreva o trabalho..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Foto</label>
            <label className="flex flex-col items-center justify-center w-full h-32 bg-[#0f1117] border-2 border-dashed border-[#2a2d3e] rounded-xl cursor-pointer hover:border-blue-500 transition">
              <span className="text-gray-500 text-sm">
                {foto ? foto.name : 'Clique para escolher uma foto'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFoto}
                className="hidden"
              />
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 rounded-xl w-full object-cover max-h-64"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl py-3 font-semibold transition flex items-center justify-center gap-2"
          >
            {loading ? 'Publicando...' : '✦ Publicar Post'}
          </button>
        </form>
      </div>
    </div>
  )
}