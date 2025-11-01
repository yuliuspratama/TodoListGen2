'use client'

import { useState } from 'react'
import type { Todo, Priority } from '@/lib/types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, completed: boolean) => void
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
}

const priorityColors: Record<Priority, string> = {
  low: 'bg-opacity-20 bg-secondary text-text-secondary border-border',
  medium: 'bg-opacity-20 bg-warning text-text border-border',
  high: 'bg-opacity-20 bg-error text-error border-border',
}

const priorityLabels: Record<Priority, string> = {
  low: 'Rendah',
  medium: 'Sedang',
  high: 'Tinggi',
}

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('Apakah Anda yakin ingin menghapus todo ini?')) {
      setIsDeleting(true)
      try {
        await onDelete(todo.id)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const isOverdue = todo.deadline && new Date(todo.deadline) < new Date() && !todo.completed

  return (
    <div
      className={`bg-surface rounded-lg shadow border-l-4 p-4 border ${
        todo.completed
          ? 'opacity-60 border-border'
          : isOverdue
          ? 'border-error'
          : 'border-primary'
      } transition-all hover:shadow-md`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => onToggle(todo.id, e.target.checked)}
              className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer flex-shrink-0"
            />
            <h3
              className={`font-semibold text-lg flex-1 min-w-0 ${
                todo.completed ? 'line-through text-text-secondary' : 'text-text'
              }`}
            >
              {todo.title}
            </h3>
            <span
              className={`px-2 py-1 text-xs font-medium rounded border flex-shrink-0 ${priorityColors[todo.priority]}`}
            >
              {priorityLabels[todo.priority]}
            </span>
          </div>

          {todo.description && (
            <p className={`text-sm text-text-secondary ml-8 ${todo.completed ? 'line-through' : ''}`}>
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-3 ml-8">
            {todo.category && (
              <span className="text-xs text-text-secondary bg-background px-2 py-1 rounded border border-border">
                {todo.category}
              </span>
            )}
            {todo.deadline && (
              <span
                className={`text-xs ${
                  isOverdue ? 'text-error font-semibold' : 'text-text-secondary'
                }`}
              >
                📅 {formatDate(todo.deadline)}
                {isOverdue && ' (Terlambat!)'}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => onEdit(todo)}
            className="px-3 py-1 text-sm text-primary hover:bg-primary hover:bg-opacity-10 rounded transition"
            disabled={isDeleting}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-sm text-error hover:bg-error hover:bg-opacity-10 rounded transition"
            disabled={isDeleting}
          >
            {isDeleting ? 'Menghapus...' : 'Hapus'}
          </button>
        </div>
      </div>
    </div>
  )
}

