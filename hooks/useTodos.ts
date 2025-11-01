'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Todo, TodoInsert, TodoUpdate } from '@/lib/types'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setTodos([])
        setLoading(false)
        return
      }

      const { data, error: fetchError } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setTodos(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat todos')
      console.error('Error fetching todos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()

    // Subscribe to changes
    const channel = supabase
      .channel('todos-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'todos',
        },
        () => {
          fetchTodos()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const createTodo = async (todo: TodoInsert): Promise<Todo | null> => {
    try {
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User tidak terautentikasi')

      const { data, error: insertError } = await supabase
        .from('todos')
        .insert({
          ...todo,
          user_id: user.id,
          priority: todo.priority || 'medium',
        })
        .select()
        .single()

      if (insertError) throw insertError

      await fetchTodos()
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal membuat todo'
      setError(errorMessage)
      throw err
    }
  }

  const updateTodo = async (id: string, updates: TodoUpdate): Promise<Todo | null> => {
    try {
      setError(null)

      const { data, error: updateError } = await supabase
        .from('todos')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      await fetchTodos()
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal mengupdate todo'
      setError(errorMessage)
      throw err
    }
  }

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      setError(null)

      const { error: deleteError } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      await fetchTodos()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menghapus todo'
      setError(errorMessage)
      throw err
    }
  }

  const toggleComplete = async (id: string, completed: boolean): Promise<void> => {
    await updateTodo(id, { completed })
  }

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    refetch: fetchTodos,
  }
}

