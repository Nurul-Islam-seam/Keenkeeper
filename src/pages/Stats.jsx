import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { useTimeline } from '../context/TimelineContext'

const colors = ['#244D3F', '#0EA5E9', '#F59E0B']

const labels = {
  call: 'Call',
  text: 'Text',
  video: 'Video',
}

function Stats() {
  const { entries } = useTimeline()

  const chartData = ['call', 'text', 'video'].map((type) => ({
    name: labels[type],
    value: entries.filter((entry) => entry.type === type).length,
  }))

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Friendship Analytics</h1>
      <p className="mt-2 text-sm text-slate-600 sm:text-base">
        Breakdown of your interactions by check-in type.
      </p>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="h-[320px] w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={55}
                paddingAngle={4}
              >
                {chartData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

export default Stats
