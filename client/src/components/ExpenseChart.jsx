import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";

const ExpenseChart = ({ data }) => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
            Monthly Expenses
        </h2>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                    contentStyle={{ backgroundColor: "#f8fafc", borderRadius: "10px" }}
                    itemStyle={{ color: "#4b5563" }}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar
                    dataKey="amount"
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export default ExpenseChart;
