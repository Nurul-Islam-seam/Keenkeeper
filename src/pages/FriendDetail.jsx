import {
  AlarmClockPlus,
  Archive,
  Mail,
  Pencil,
  Trash2,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import callIcon from '../assets/call.png'
import textIcon from '../assets/text.png'
import videoIcon from '../assets/video.png'
import { useTimeline } from '../context/TimelineContext'
import friends from '../data/friends.json'

function FriendDetail() {
  const { id } = useParams()
  const { addEntry } = useTimeline()
  const friend = friends.find((item) => item.id === Number(id))

  const statusBadgeClass = {
    overdue: 'bg-red-500 text-white',
    'almost due': 'bg-[#EFAD44] text-white',
    'on-track': 'bg-[#244D3F] text-white',
  }

  const handleCheckIn = (type) => {
    addEntry(type, friend.name)
    toast.success(`${type[0].toUpperCase() + type.slice(1)} check-in added for ${friend.name}`)
  }

  if (!friend) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Friend not found</h1>
          <p className="mt-2 text-slate-600">This profile does not exist in your current list.</p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-full bg-[#244D3F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D3F33]"
          >
            Return to Home
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col items-center text-center">
            <img
              src={friend.avatar}
              alt={friend.name}
              className="h-24 w-24 rounded-full object-cover"
            />
            <h1 className="mt-4 text-2xl font-bold text-slate-900">{friend.name}</h1>
            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClass[friend.status] || 'bg-slate-100 text-slate-700'}`}
            >
              {friend.status}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {friend.tags.map((tag) => (
              <span
                key={`${friend.id}-${tag}`}
                className="rounded-full bg-[#CBFADB] px-3 py-1 text-xs font-medium text-[#244D3F]"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-slate-600">{friend.bio}</p>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600">
            <Mail className="h-4 w-4" />
            <span className="break-all">{friend.email}</span>
          </div>

          <div className="mt-6 space-y-2">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <AlarmClockPlus className="h-4 w-4" />
              Snooze 2 Weeks
            </button>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Archive className="h-4 w-4" />
              Archive
            </button>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </aside>

        <div className="space-y-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">Days Since Contact</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{friend.daysSinceContact}</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">Goal (Days)</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{friend.goal}</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-500">Next Due Date</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{friend.nextDueDate}</p>
            </article>
          </div>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">Relationship Goal</h2>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Keep in touch every <strong>{friend.goal} days</strong> to stay connected and avoid overdue check-ins.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Check-In</h2>
            <p className="mt-2 text-sm text-slate-600">
              Log your latest interaction and keep your timeline up to date.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => handleCheckIn('call')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#244D3F] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#1D3F33]"
              >
                <img src={callIcon} alt="Call" className="h-4 w-4" />
                Call
              </button>
              <button
                type="button"
                onClick={() => handleCheckIn('text')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <img src={textIcon} alt="Text" className="h-4 w-4" />
                Text
              </button>
              <button
                type="button"
                onClick={() => handleCheckIn('video')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <img src={videoIcon} alt="Video" className="h-4 w-4" />
                Video
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default FriendDetail
