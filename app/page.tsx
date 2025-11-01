'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useTodos } from '@/hooks/useTodos'
import TodoList from '@/components/TodoList'
import TodoFilter from '@/components/TodoFilter'
import TodoForm from '@/components/TodoForm'
import type { FilterOptions, TodoInsert } from '@/lib/types'

export default function Home() {
  const router = useRouter()
  const { user, loading: authLoading, signOut } = useAuth()
  const { todos, createTodo } = useTodos()
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: 'all',
    priority: 'all',
    category: 'all',
    search: '',
    sort: 'newest',
  })
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get unique categories from todos
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(todos.map((todo) => todo.category).filter((cat): cat is string => !!cat))
    )
    return uniqueCategories.sort()
  }, [todos])

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  const handleCreateTodo = async (data: TodoInsert) => {
    setIsSubmitting(true)
    try {
      await createTodo(data)
      setShowCreateForm(false)
    } catch (error) {
      console.error('Error creating todo:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Todo List App</h1>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-sm text-gray-600 truncate max-w-[200px] sm:max-w-none">
              {user.email}
            </span>
            <button
              onClick={signOut}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition whitespace-nowrap"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Create Todo Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition shadow-md hover:shadow-lg"
          >
            + Buat Todo Baru
          </button>
        </div>

        {/* Todo Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Total Todo</p>
            <p className="text-2xl font-bold text-gray-900">{todos.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Aktif</p>
            <p className="text-2xl font-bold text-blue-600">
              {todos.filter((t) => !t.completed).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Selesai</p>
            <p className="text-2xl font-bold text-green-600">
              {todos.filter((t) => t.completed).length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <TodoFilter
          filterOptions={filterOptions}
          categories={categories}
          onFilterChange={setFilterOptions}
        />

        {/* Todo List */}
        <TodoList filterOptions={filterOptions} />

        {/* Create Todo Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Buat Todo Baru</h2>
              <TodoForm
                onSubmit={handleCreateTodo}
                onCancel={() => setShowCreateForm(false)}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
