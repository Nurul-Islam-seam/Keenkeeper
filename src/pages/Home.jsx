import { useEffect, useMemo, useState } from 'react'
import { Clock3, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTimeline } from '../context/TimelineContext'
import friends from '../data/friends.json'

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeStatus, setActiveStatus] = useState('all')
  const { entries } = useTimeline()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const totalFriends = friends.length
  const onTrackFriends = friends.filter((friend) => friend.status === 'on-track').length
  const needAttention = friends.filter((friend) => friend.status !== 'on-track').length

  const statusFilters = [
    { id: 'all', label: 'All' },
    { id: 'on-track', label: 'On Track' },
    { id: 'almost due', label: 'Almost Due' },
    { id: 'overdue', label: 'Overdue' },
  ]

  const filteredFriends = useMemo(() => {
    if (activeStatus === 'all') {
      return friends
    }

    return friends.filter((friend) => friend.status === activeStatus)
  }, [activeStatus])

  const latestInteraction = entries[0]

  const statusBadgeClass = {
    overdue: 'bg-red-500 text-white',
    'almost due': 'bg-[#EFAD44] text-white',
    'on-track': 'bg-[#244D3F] text-white',
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="rounded-3xl bg-gradient-to-br from-[#ECFDF5] to-[#F8FAFC] p-5 text-center shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Keep Your Connections Meaningful
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Stay mindful about the people who matter most with simple friendship goals and check-ins.
        </p>

        <button
          type="button"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#244D3F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D3F33]"
        >
          <Plus className="h-4 w-4" />
          <span>Add a Friend</span>
        </button>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-4 text-left sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Total Friends</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{totalFriends}</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-4 text-left sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">On Track</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600">{onTrackFriends}</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-4 text-left sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Need Attention</p>
            <p className="mt-2 text-2xl font-bold text-amber-600">{needAttention}</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-4 text-left sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Interactions</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{entries.length}</p>
          </article>
        </div>

        <div className="mt-5 rounded-2xl border border-[#244D3F]/20 bg-white/70 px-4 py-3 text-left text-xs text-slate-600 sm:px-5 sm:text-sm">
          <span className="font-semibold text-slate-800">Latest Activity:</span>{' '}
          {latestInteraction
            ? `${latestInteraction.title} on ${new Date(latestInteraction.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}`
            : 'No check-ins yet'}
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-56 items-center justify-center rounded-3xl border border-slate-200 bg-white">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#244D3F]" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {statusFilters.map((status) => (
              <button
                key={status.id}
                type="button"
                onClick={() => setActiveStatus(status.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeStatus === status.id
                    ? 'bg-[#244D3F] text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-[#244D3F]'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredFriends.map((friend) => (
              <Link
                key={friend.id}
                to={`/friend/${friend.id}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#244D3F]/40"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">{friend.name}</h2>
                    <p className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <Clock3 className="h-3.5 w-3.5" />
                      {friend.daysSinceContact} days since contact
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {friend.tags.map((tag) => (
                    <span
                      key={`${friend.id}-${tag}`}
                      className="rounded-full bg-[#CBFADB] px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span
                  className={`mt-4 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass[friend.status]}`}
                >
                  {friend.status}
                </span>
              </Link>
            ))}
          </div>

          {filteredFriends.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
              No friends found in this category.
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Home
