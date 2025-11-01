'use client'

import { useTheme, Theme, themes } from '@/contexts/ThemeContext'
import { useState } from 'react'

export default function ThemeSelector() {
  const { theme, setTheme, isLoading } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  if (isLoading) {
    return null
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface text-text border border-border hover:bg-opacity-80 transition shadow-sm"
        aria-label="Pilih tema"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
        <span className="hidden sm:inline">{themes[theme].name}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 rounded-lg bg-surface border border-border shadow-lg z-20 overflow-hidden">
            <div className="p-2">
              <div className="text-xs font-semibold text-text-secondary px-3 py-2">
                Pilih Tema
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(themes) as Theme[]).map((themeKey) => {
                  const themeConfig = themes[themeKey]
                  const isActive = theme === themeKey

                  return (
                    <button
                      key={themeKey}
                      onClick={() => handleThemeChange(themeKey)}
                      className={`
                        p-3 rounded-lg border-2 transition-all
                        ${
                          isActive
                            ? 'border-primary bg-primary bg-opacity-10'
                            : 'border-border hover:border-primary hover:border-opacity-50'
                        }
                      `}
                    >
                      <div
                        className="w-full h-8 rounded mb-2"
                        style={{
                          background: `linear-gradient(135deg, ${themeConfig.colors.primary} 0%, ${themeConfig.colors.secondary} 100%)`,
                        }}
                      />
                      <div className="text-xs font-medium text-text">{themeConfig.name}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

