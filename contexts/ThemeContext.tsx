'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

export type Theme = 'light' | 'dark' | 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'red'

export interface ThemeColors {
  primary: string
  secondary: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  success: string
  error: string
  warning: string
}

export interface ThemeConfig {
  name: string
  colors: ThemeColors
}

export const themes: Record<Theme, ThemeConfig> = {
  light: {
    name: 'Terang',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      background: '#f9fafb',
      surface: '#ffffff',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
    },
  },
  dark: {
    name: 'Gelap',
    colors: {
      primary: '#3b82f6',
      secondary: '#94a3b8',
      background: '#111827',
      surface: '#1f2937',
      text: '#f9fafb',
      textSecondary: '#d1d5db',
      border: '#374151',
      success: '#34d399',
      error: '#f87171',
      warning: '#fbbf24',
    },
  },
  blue: {
    name: 'Biru',
    colors: {
      primary: '#2563eb',
      secondary: '#3b82f6',
      background: '#eff6ff',
      surface: '#ffffff',
      text: '#1e3a8a',
      textSecondary: '#3b82f6',
      border: '#bfdbfe',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
    },
  },
  green: {
    name: 'Hijau',
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      background: '#f0fdf4',
      surface: '#ffffff',
      text: '#065f46',
      textSecondary: '#10b981',
      border: '#bbf7d0',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
    },
  },
  purple: {
    name: 'Ungu',
    colors: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      background: '#faf5ff',
      surface: '#ffffff',
      text: '#6b21a8',
      textSecondary: '#8b5cf6',
      border: '#e9d5ff',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
    },
  },
  orange: {
    name: 'Oranye',
    colors: {
      primary: '#f97316',
      secondary: '#fb923c',
      background: '#fff7ed',
      surface: '#ffffff',
      text: '#9a3412',
      textSecondary: '#f97316',
      border: '#fed7aa',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
    },
  },
  pink: {
    name: 'Merah Muda',
    colors: {
      primary: '#ec4899',
      secondary: '#f472b6',
      background: '#fdf2f8',
      surface: '#ffffff',
      text: '#831843',
      textSecondary: '#ec4899',
      border: '#fbcfe8',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
    },
  },
  red: {
    name: 'Merah',
    colors: {
      primary: '#ef4444',
      secondary: '#f87171',
      background: '#fef2f2',
      surface: '#ffffff',
      text: '#991b1b',
      textSecondary: '#ef4444',
      border: '#fecaca',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
    },
  },
}

interface ThemeContextType {
  theme: Theme
  themeConfig: ThemeConfig
  setTheme: (theme: Theme) => void
  isLoading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [theme, setThemeState] = useState<Theme>('light')
  const [isLoading, setIsLoading] = useState(true)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme)
    }
    setIsLoading(false)
  }, [])

  // Load theme from Supabase for logged-in users
  useEffect(() => {
    if (user && !isLoading) {
      loadThemeFromSupabase()
    }
  }, [user, isLoading])

  const loadThemeFromSupabase = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('theme')
        .eq('user_id', user.id)
        .single()

      // Ignore error if table doesn't exist yet (will be created by migration)
      if (error && error.code !== 'PGRST116') {
        console.error('Error loading theme from Supabase:', error)
        return
      }

      if (!error && data?.theme && themes[data.theme as Theme]) {
        setThemeState(data.theme as Theme)
        localStorage.setItem('theme', data.theme)
      }
    } catch (err) {
      // Silently ignore errors if table doesn't exist
      // This is expected during initial setup
    }
  }

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)

    // Save to Supabase if user is logged in
    if (user) {
      try {
        const { error } = await supabase
          .from('user_preferences')
          .upsert(
            {
              user_id: user.id,
              theme: newTheme,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id' }
          )

        if (error) {
          console.error('Error saving theme to Supabase:', error)
        }
      } catch (err) {
        console.error('Error saving theme:', err)
      }
    }
  }

  const themeConfig = themes[theme]

  // Apply theme CSS variables
  useEffect(() => {
    const root = document.documentElement
    const colors = themeConfig.colors

    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-background', colors.background)
    root.style.setProperty('--color-surface', colors.surface)
    root.style.setProperty('--color-text', colors.text)
    root.style.setProperty('--color-text-secondary', colors.textSecondary)
    root.style.setProperty('--color-border', colors.border)
    root.style.setProperty('--color-success', colors.success)
    root.style.setProperty('--color-error', colors.error)
    root.style.setProperty('--color-warning', colors.warning)
  }, [themeConfig])

  return (
    <ThemeContext.Provider value={{ theme, themeConfig, setTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

