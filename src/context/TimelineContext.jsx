import { createContext, useContext, useMemo, useState } from 'react'

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

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState(initialEntries)

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
