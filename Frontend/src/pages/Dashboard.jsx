import React, { useEffect, useState } from 'react';
import { getAllExpenses, addExpense, deleteExpense } from '../services/expenseService';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

// 1. Chart.js Imports
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await getAllExpenses();
      setExpenses(response.data || []);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  // 2. Logic: Prepare Filtered List and Categories
  const categories = ["All", ...new Set(expenses.map(exp => exp.category))];
  
  const filteredExpenses = selectedCategory === "All" 
    ? expenses 
    : expenses.filter(exp => exp.category === selectedCategory);

  const totalExpense = filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);

  // 3. Logic: Prepare Monthly Chart Data
  const monthlyData = {};
  expenses.forEach(exp => {
    // Extract YYYY-MM from date string
    const month = exp.date.substring(0, 7); 
    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }
    monthlyData[month] += Number(exp.amount);
  });

  // Sort months chronologically for the chart
  const sortedMonths = Object.keys(monthlyData).sort();

  const chartData = {
    labels: sortedMonths,
    datasets: [
      {
        label: "Monthly Expenses ($)",
        data: sortedMonths.map(month => monthlyData[month]),
        backgroundColor: "#3b82f6", // Blue-500
        borderRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#94a3b8' } // slate-400
      }
    },
    scales: {
      y: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
      x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
    }
  };

  // Handlers
  const handleChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = { ...newExpense, amount: parseFloat(newExpense.amount) };
      await addExpense(expenseData);
      setNewExpense({ title: '', amount: '', category: 'Food', date: '' });
      fetchExpenses();
    } catch (err) {
      alert("Failed to add expense");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this expense?")) {
      try {
        await deleteExpense(id);
        fetchExpenses();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <nav className="border-b border-slate-800 bg-slate-900/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-500">Expense<span className="text-white">Tracker</span></h2>
          <button onClick={() => { logout(); navigate('/login'); }} className="px-4 py-2 bg-slate-800 text-red-400 rounded-lg hover:bg-slate-700 transition">Logout</button>
        </div>
      </nav>

      {/* Hero Stats */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-sm">{selectedCategory === "All" ? "Total Expenses" : `Total ${selectedCategory}`}</p>
            <h2 className="text-3xl font-bold text-emerald-400 mt-1">${totalExpense.toFixed(2)}</h2>
          </div>
          <div className="text-4xl">📊</div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-6 text-blue-400">New Transaction</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="title" placeholder="Title" value={newExpense.title} onChange={handleChange} required className="w-full bg-slate-800 p-3 rounded-xl outline-none border border-transparent focus:border-blue-500" />
              <input name="amount" type="number" step="0.01" placeholder="Amount" value={newExpense.amount} onChange={handleChange} required className="w-full bg-slate-800 p-3 rounded-xl outline-none border border-transparent focus:border-blue-500" />
              <select name="category" value={newExpense.category} onChange={handleChange} required className="w-full bg-slate-800 p-3 rounded-xl outline-none border border-transparent focus:border-blue-500">
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
              </select>
              <input name="date" type="date" value={newExpense.date} onChange={handleChange} required className="w-full bg-slate-800 p-3 rounded-xl outline-none border border-transparent focus:border-blue-500" />
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition">Add Expense</button>
            </form>
          </div>
        </div>

        {/* Right Column: Chart & Table */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Chart Section */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Monthly Expense Analytics</h3>
            <div className="h-[300px] flex justify-center">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Table Section */}
          <div>
            <div className="mb-6 flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <label className="text-slate-400 font-medium">Filter Category:</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-800 border border-slate-700 p-2 rounded-lg text-blue-400 outline-none focus:ring-2 ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-800/50">
                    <th className="p-4">Title</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((exp) => (
                      <tr key={exp.id || exp._id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="p-4">{exp.title}</td>
                        <td className="p-4 text-emerald-400 font-semibold">${Number(exp.amount).toFixed(2)}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs border border-blue-500/20">
                            {exp.category}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400">{exp.date}</td>
                        <td className="p-4">
                          <button onClick={() => handleDelete(exp.id || exp._id)} className="text-red-500 hover:text-red-400">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-12 text-slate-500">No transactions found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;