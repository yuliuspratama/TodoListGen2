'use client'

import { useState, useEffect } from 'react'
import type { Todo, TodoInsert, TodoUpdate, Priority } from '@/lib/types'

interface TodoFormProps {
  todo?: Todo | null
  onSubmit: (data: TodoInsert | TodoUpdate) => Promise<void>
  onCancel: () => void
  isSubmitting?: boolean
}

export default function TodoForm({ todo, onSubmit, onCancel, isSubmitting = false }: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [category, setCategory] = useState('')
  const [deadline, setDeadline] = useState('')
  const [error, setError] = useState<string | null>(null)

  const isEditMode = !!todo

  useEffect(() => {
    if (todo) {
      setTitle(todo.title)
      setDescription(todo.description || '')
      setPriority(todo.priority)
      setCategory(todo.category || '')
      setDeadline(todo.deadline ? new Date(todo.deadline).toISOString().split('T')[0] : '')
    } else {
      // Reset form for new todo
      setTitle('')
      setDescription('')
      setPriority('medium')
      setCategory('')
      setDeadline('')
    }
    setError(null)
  }, [todo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim()) {
      setError('Judul todo harus diisi')
      return
    }

    try {
      const formData: TodoInsert | TodoUpdate = {
        title: title.trim(),
        description: description.trim() || null,
        priority,
        category: category.trim() || null,
        deadline: deadline ? new Date(deadline).toISOString() : null,
      }

      await onSubmit(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-error bg-opacity-10 border-2 border-error px-4 py-3 rounded text-sm">
          <p className="text-error font-medium">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-text mb-1">
          Judul <span className="text-error">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Masukkan judul todo"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-text mb-1">
          Deskripsi
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Masukkan deskripsi (opsional)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-text mb-1">
            Prioritas
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="low">Rendah</option>
            <option value="medium">Sedang</option>
            <option value="high">Tinggi</option>
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-text mb-1">
            Kategori
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Contoh: Kerja, Pribadi"
          />
        </div>
      </div>

      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-text mb-1">
          Deadline
        </label>
        <input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting || !title.trim()}
          className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isSubmitting
            ? 'Menyimpan...'
            : isEditMode
            ? 'Update Todo'
            : 'Buat Todo'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 bg-secondary bg-opacity-20 text-text py-2 px-4 rounded-md hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Batal
        </button>
      </div>
    </form>
  )
}

