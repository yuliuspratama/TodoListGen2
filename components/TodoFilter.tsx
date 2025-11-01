'use client'

import type { FilterOptions, Priority } from '@/lib/types'

interface TodoFilterProps {
  filterOptions: FilterOptions
  categories: string[]
  onFilterChange: (options: FilterOptions) => void
}

export default function TodoFilter({ filterOptions, categories, onFilterChange }: TodoFilterProps) {
  const updateFilter = (key: keyof FilterOptions, value: string | Priority | 'all') => {
    onFilterChange({
      ...filterOptions,
      [key]: value,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter & Urutkan</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Cari
          </label>
          <input
            id="search"
            type="text"
            value={filterOptions.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Cari todo..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={filterOptions.status}
            onChange={(e) => updateFilter('status', e.target.value as FilterOptions['status'])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Semua</option>
            <option value="active">Aktif</option>
            <option value="completed">Selesai</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Prioritas
          </label>
          <select
            id="priority"
            value={filterOptions.priority}
            onChange={(e) => updateFilter('priority', e.target.value as Priority | 'all')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Semua</option>
            <option value="high">Tinggi</option>
            <option value="medium">Sedang</option>
            <option value="low">Rendah</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            id="category"
            value={filterOptions.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Semua</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sort Options */}
      <div className="mt-4">
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
          Urutkan berdasarkan
        </label>
        <select
          id="sort"
          value={filterOptions.sort}
          onChange={(e) => updateFilter('sort', e.target.value as FilterOptions['sort'])}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
          <option value="deadline">Deadline</option>
          <option value="priority">Prioritas (Tinggi ke Rendah)</option>
          <option value="alphabetical">Abjad (A-Z)</option>
        </select>
      </div>

      {/* Reset Filters */}
      {(filterOptions.search ||
        filterOptions.status !== 'all' ||
        filterOptions.priority !== 'all' ||
        filterOptions.category !== 'all' ||
        filterOptions.sort !== 'newest') && (
        <button
          onClick={() =>
            onFilterChange({
              status: 'all',
              priority: 'all',
              category: 'all',
              search: '',
              sort: 'newest',
            })
          }
          className="mt-4 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition"
        >
          Reset Filter
        </button>
      )}
    </div>
  )
}

