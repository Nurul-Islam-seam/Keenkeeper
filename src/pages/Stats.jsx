import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { useTimeline } from '../context/TimelineContext'

const typeConfig = [
  { key: 'text', label: 'Text', color: '#6B3AF2' },
  { key: 'call', label: 'Call', color: '#1E5A49' },
  { key: 'video', label: 'Video', color: '#36A867' },
]

function Stats() {
  const { entries } = useTimeline()

  const chartData = typeConfig.map((type) => ({
    name: type.label,
    value: entries.filter((entry) => entry.type === type.key).length,
    color: type.color,
  }))

  const totalInteractions = chartData.reduce((total, item) => total + item.value, 0)

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Friendship Analytics</h1>

      <div className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <h2 className="text-2xl font-semibold text-[#1E5A49] sm:text-[2rem]">By Interaction Type</h2>

        {totalInteractions > 0 ? (
          <div className="mx-auto mt-4 h-[420px] w-full max-w-[760px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={132}
                  innerRadius={82}
                  paddingAngle={5}
                  cornerRadius={14}
                  stroke="#FFFFFF"
                  strokeWidth={6}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  cursor={false}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
                  }}
                />

                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{ paddingTop: 16 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-600">
            No interactions yet. Add a check-in from a friend profile to see your chart.
          </div>
        )}
      </div>
    </section>
  )
}

export default Stats
