import { Link, useParams } from 'react-router-dom'

function FriendPreview() {
  const { id } = useParams()

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
        Phase 1
      </p>
      <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Friend #{id} Preview</h1>
      <p className="mt-3 text-sm text-slate-600 sm:text-base">
        Detailed friend profile is coming in phase 2.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-[#244D3F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D3F33]"
      >
        Back to Home
      </Link>
    </section>
  )
}

export default FriendPreview
