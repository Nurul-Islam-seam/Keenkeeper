import { useMemo, useState } from 'react'
import { MessageSquareText, PhoneCall, Video } from 'lucide-react'
import { useTimeline } from '../context/TimelineContext'

const filterOptions = ['All', 'Call', 'Text', 'Video']

const typeIconMap = {
  call: PhoneCall,
  text: MessageSquareText,
  video: Video,
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function Timeline() {
  const [activeFilter, setActiveFilter] = useState('All')
  const { entries } = useTimeline()

  const filteredEntries = useMemo(() => {
    if (activeFilter === 'All') {
      return entries
    }

    return entries.filter(
      (entry) => entry.type.toLowerCase() === activeFilter.toLowerCase(),
    )
  }, [activeFilter, entries])

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Timeline</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setActiveFilter(option)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeFilter === option
                ? 'bg-[#244D3F] text-white'
                : 'bg-slate-100 text-slate-600 hover:text-[#244D3F]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => {
            const Icon = typeIconMap[entry.type] ?? PhoneCall

            return (
              <article
                key={entry.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-full bg-[#ECFDF5] p-2 text-[#244D3F]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="truncate text-sm font-semibold text-slate-900">{entry.title}</p>
                </div>
                <p className="shrink-0 text-xs font-medium text-slate-500">{formatDate(entry.date)}</p>
              </article>
            )
          })
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
            No entries for this filter yet.
          </div>
        )}
      </div>
    </section>
  )
}

export default Timeline
