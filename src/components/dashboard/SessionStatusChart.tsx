
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const data: ChartData[] = [
  { name: "Active", value: 12, color: "#10b981" },
  { name: "Completed", value: 24, color: "#6366f1" },
  { name: "Failed", value: 3, color: "#ef4444" },
  { name: "Pending", value: 5, color: "#f59e0b" },
];

const SessionStatusChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={50}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value} sessions`, '']}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center" 
            formatter={(value) => <span className="text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SessionStatusChart;
