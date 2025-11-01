export type Priority = 'low' | 'medium' | 'high'

export interface Todo {
  id: string
  user_id: string
  title: string
  description?: string | null
  completed: boolean
  priority: Priority
  category?: string | null
  deadline?: string | null
  created_at: string
  updated_at: string
}

export interface TodoInsert {
  title: string
  description?: string | null
  priority?: Priority
  category?: string | null
  deadline?: string | null
}

export interface TodoUpdate {
  title?: string
  description?: string | null
  completed?: boolean
  priority?: Priority
  category?: string | null
  deadline?: string | null
}

export type FilterStatus = 'all' | 'active' | 'completed'
export type SortOption = 'newest' | 'oldest' | 'deadline' | 'priority' | 'alphabetical'

export interface FilterOptions {
  status: FilterStatus
  priority: Priority | 'all'
  category: string | 'all'
  search: string
  sort: SortOption
}

