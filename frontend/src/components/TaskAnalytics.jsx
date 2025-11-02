import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const TaskAnalytics = ({ tasks }) => {
  // Calculate statistics
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  // Daily data calculation
  const getDailyData = () => {
    const dateMap = {};
    tasks.forEach(task => {
      const date = new Date(task.dueDate).toLocaleDateString('en-CA');
      if (!dateMap[date]) {
        dateMap[date] = { date, pending: 0, inProgress: 0, completed: 0 };
      }
      if (task.status === 'pending') dateMap[date].pending++;
      if (task.status === 'in progress') dateMap[date].inProgress++;
      if (task.status === 'completed') dateMap[date].completed++;
    });
    return Object.values(dateMap).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const dailyData = getDailyData();

  // Pie chart data
  const pieData = [
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
    { name: 'In Progress', value: stats.inProgress, color: '#a855f7' },
    { name: 'Completed', value: stats.completed, color: '#10b981' }
  ];

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800">Task Analytics</h2>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart - Daily Status */}
       <div className="bg-white rounded-xl shadow-lg p-6">
  <h3 className="text-lg font-semibold mb-4 text-gray-700">Daily Task Status </h3>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={dailyData}>
      {/* Grid lines */}
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

      {/* X and Y axis */}
      <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6b7280" />
      <YAxis stroke="#6b7280" />

      {/* Tooltip box */}
      <Tooltip
        contentStyle={{
          backgroundColor: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      />

      {/* Legend for line names */}
      <Legend />

      {/* Lines for each category */}
      <Line
        type="monotone"
        dataKey="pending"
        stroke="#f59e0b"
        name="Pending"
        strokeWidth={3}
        dot={{ r: 5 }}
      />
      <Line
        type="monotone"
        dataKey="inProgress"
        stroke="#a855f7"
        name="In Progress"
        strokeWidth={3}
        dot={{ r: 5 }}
      />
      <Line
        type="monotone"
        dataKey="completed"
        stroke="#10b981"
        name="Completed"
        strokeWidth={3}
        dot={{ r: 5 }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>




        {/* Pie Chart - Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Task Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart - Trend */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Progress Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="completed" 
              stroke="#10b981" 
              strokeWidth={3}
              name="Completed"
              dot={{ fill: '#10b981', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="inProgress" 
              stroke="#a855f7" 
              strokeWidth={3}
              name="In Progress"
              dot={{ fill: '#a855f7', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="pending" 
              stroke="#f59e0b" 
              strokeWidth={3}
              name="Pending"
              dot={{ fill: '#f59e0b', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskAnalytics;