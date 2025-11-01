'use client'

import { useState } from 'react'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import type { Todo, FilterOptions, TodoInsert, TodoUpdate } from '@/lib/types'
import { useTodos } from '@/hooks/useTodos'

interface TodoListProps {
  filterOptions: FilterOptions
}

export default function TodoList({ filterOptions }: TodoListProps) {
  const { todos, loading, error, toggleComplete, deleteTodo, updateTodo } = useTodos()
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getFilteredAndSortedTodos = (): Todo[] => {
    let filtered = [...todos]

    // Filter by status
    if (filterOptions.status === 'completed') {
      filtered = filtered.filter((todo) => todo.completed)
    } else if (filterOptions.status === 'active') {
      filtered = filtered.filter((todo) => !todo.completed)
    }

    // Filter by priority
    if (filterOptions.priority !== 'all') {
      filtered = filtered.filter((todo) => todo.priority === filterOptions.priority)
    }

    // Filter by category
    if (filterOptions.category !== 'all') {
      filtered = filtered.filter((todo) => todo.category === filterOptions.category)
    }

    // Filter by search
    if (filterOptions.search.trim()) {
      const searchLower = filterOptions.search.toLowerCase()
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchLower) ||
          todo.description?.toLowerCase().includes(searchLower)
      )
    }

    // Sort
    switch (filterOptions.sort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case 'deadline':
        filtered.sort((a, b) => {
          if (!a.deadline && !b.deadline) return 0
          if (!a.deadline) return 1
          if (!b.deadline) return -1
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        })
        break
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
        break
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }

  const filteredTodos = getFilteredAndSortedTodos()

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Memuat todos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p className="font-semibold">Error:</p>
        <p>{error}</p>
      </div>
    )
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">
          {todos.length === 0 ? 'Belum ada todo. Buat todo pertama Anda!' : 'Tidak ada todo yang sesuai dengan filter.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleComplete}
          onEdit={setEditingTodo}
          onDelete={deleteTodo}
        />
      ))}
      {editingTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
            <TodoForm
              todo={editingTodo}
              onSubmit={async (data) => {
                setIsSubmitting(true)
                try {
                  await updateTodo(editingTodo.id, data as TodoUpdate)
                  setEditingTodo(null)
                } finally {
                  setIsSubmitting(false)
                }
              }}
              onCancel={() => setEditingTodo(null)}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}
    </div>
  )
}

