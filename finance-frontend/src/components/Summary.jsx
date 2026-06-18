import { useEffect, useState } from "react"
import { getSummary, getByCategory, getMonthly } from "../api"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

const Summary = ({showChartsOnly = false}) => {
  const [summary, setSummary] = useState(null)
  const [byCategory, setByCategory] = useState([])
  const [monthly, setMonthly] = useState([])

  useEffect(() => {
    getSummary().then(res => setSummary(res.data))
    getByCategory().then(res => setByCategory(res.data))
    getMonthly().then(res => setMonthly(res.data))
  }, [])

  return (
    <div className="flex flex-col gap-4 w-full ${showChartsOnly ? 'pt-0' : ''}">
     {/* Summary Cards */}
      {!showChartsOnly && summary && (
        <div className="grid grid-cols-3 gap-4 w-full max-w-7xl">
            <div className="rounded-lg border bg-card p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold" style={{color: "var(--chart-1)"}}>${summary.total_income}</p>
            </div>
            <div className="rounded-lg border bg-card p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold" style={{color: "var(--chart-2)"}}>${summary.total_expenses}</p>
            </div>
            <div className="rounded-lg border bg-card p-4 text-center">
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-2xl font-bold" style={{color: "var(--chart-3)"}}>${summary.balance}</p>
            </div>
        </div>
      )}    

      {showChartsOnly && (
        <>
          {/* Category Pie Chart */}
          <div className="rounded-lg border bg-card p-4 w-full">
            <h2 className="text-lg font-bold mb-4">Spending by Category</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={byCategory}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {byCategory.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Bar Chart */}
          <div className="rounded-lg border bg-card p-4 w-full">
            <h2 className="text-lg font-bold mb-4">Monthly Trends</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthly}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="var(--chart-1)" />
                <Bar dataKey="expenses" fill="var(--chart-2)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  )
}

export default Summary