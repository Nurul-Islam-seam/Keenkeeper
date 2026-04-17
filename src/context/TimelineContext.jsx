import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const TimelineContext = createContext(undefined)

const initialEntries = [
  {
    id: 1,
    type: 'call',
    title: 'Call with Ariana Flores',
    date: '2026-04-10T09:30:00.000Z',
  },
  {
    id: 2,
    type: 'text',
    title: 'Text with Noah Bennett',
    date: '2026-04-12T15:15:00.000Z',
  },
  {
    id: 3,
    type: 'video',
    title: 'Video with Priya Nair',
    date: '2026-04-14T20:00:00.000Z',
  },
]

const STORAGE_KEY = 'keenkeeper.timeline.entries'

function loadEntries() {
  if (typeof window === 'undefined') {
    return initialEntries
  }

  try {
    const storedEntries = window.localStorage.getItem(STORAGE_KEY)
    if (!storedEntries) {
      return initialEntries
    }

    const parsedEntries = JSON.parse(storedEntries)
    return Array.isArray(parsedEntries) && parsedEntries.length > 0
      ? parsedEntries
      : initialEntries
  } catch {
    return initialEntries
  }
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState(loadEntries)

  const addEntry = (type, friendName) => {
    const entry = {
      id: Date.now(),
      type,
      title: `${capitalize(type)} with ${friendName}`,
      date: new Date().toISOString(),
    }

    setEntries((prevEntries) => [entry, ...prevEntries])
    return entry
  }

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  useEffect(() => {
    const handleStorageUpdate = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) {
        return
      }

      try {
        const parsedEntries = JSON.parse(event.newValue)
        if (Array.isArray(parsedEntries)) {
          setEntries(parsedEntries)
        }
      } catch {
        // Ignore malformed storage updates.
      }
    }

    window.addEventListener('storage', handleStorageUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageUpdate)
    }
  }, [])

  const value = useMemo(
    () => ({
      entries,
      addEntry,
    }),
    [entries],
  )

  return <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>
}

export function useTimeline() {
  const context = useContext(TimelineContext)

  if (!context) {
    throw new Error('useTimeline must be used within a TimelineProvider')
  }

  return context
}
