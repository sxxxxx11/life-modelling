import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { zh, en, Language, Translations } from './translations'

const translations: Record<Language, Translations> = { zh, en }

interface I18nContextType {
  lang: Language
  t: Translations
  setLang: (lang: Language) => void
  toggleLang: () => void
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const STORAGE_KEY = 'lifeforge_lang'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'en' || saved === 'zh') return saved
    } catch {}
    return 'zh'
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {}
  }, [lang])

  const setLang = (l: Language) => setLangState(l)
  const toggleLang = () => setLangState(prev => prev === 'zh' ? 'en' : 'zh')

  const t = translations[lang]

  return (
    <I18nContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}

// Helper for template strings like "预计还需 {count} 步完成"
export function formatTemplate(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`))
}
