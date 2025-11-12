import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { format, subMonths } from 'date-fns';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [summaryData, setSummaryData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [userIncome, setUserIncome] = useState(() => {
    const saved = localStorage.getItem('userMonthlyIncome');
    return saved ? parseFloat(saved) : '';
  });
  const [editingIncome, setEditingIncome] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

  const calculateSummary = (expenseList) => {
    let totalIncome = 0;
    let totalExpense = 0;

    expenseList.forEach((expense) => {
      const amount = parseFloat(expense.expense_amount) || 0;
      if (expense.category === 'Income') {
        totalIncome += amount;
      } else {
        totalExpense += amount;
      }
    });

    // Use user input income if set, else fallback to calculated income
    const effectiveIncome = userIncome !== '' ? parseFloat(userIncome) : totalIncome;
    setSummaryData({
      totalIncome: effectiveIncome,
      totalExpense,
      balance: effectiveIncome - totalExpense,
    });
  };

  const fetchAllExpenses = useCallback(async () => {
    try {
      const response = await axios.get('/get_expense?page=1&itemsPerPage=10000', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allExpenses = response.data.getExpense;
      setExpenses(allExpenses);
      calculateSummary(allExpenses);
      calculateCategoryData(allExpenses);
      calculateMonthlyData(allExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchAllExpenses();
  }, [fetchAllExpenses, userIncome]);

  const calculateCategoryData = (expenseList) => {
    const categoryMap = {};

    expenseList.forEach((expense) => {
      if (expense.category !== 'Income') {
        const category = expense.category;
        const amount = parseFloat(expense.expense_amount) || 0;

        if (categoryMap[category]) {
          categoryMap[category] += amount;
        } else {
          categoryMap[category] = amount;
        }
      }
    });

    const data = Object.keys(categoryMap).map((category) => ({
      name: category,
      value: parseFloat(categoryMap[category].toFixed(2)),
    }));

    const sorted = data.sort((a, b) => b.value - a.value);
    setCategoryData(data);
    setTopCategories(sorted.slice(0, 3));
  };

  const calculateMonthlyData = (expenseList) => {
    const monthMap = {};

    // Get data for last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const monthKey = format(date, 'MMM yyyy');
      monthMap[monthKey] = { month: monthKey, income: 0, expense: 0 };
    }

    expenseList.forEach((expense) => {
      const date = new Date(expense.createdAt);
      const monthKey = format(date, 'MMM yyyy');

      if (monthMap[monthKey]) {
        const amount = parseFloat(expense.expense_amount) || 0;
        if (expense.category === 'Income') {
          monthMap[monthKey].income += amount;
        } else {
          monthMap[monthKey].expense += amount;
        }
      }
    });

    const data = Object.keys(monthMap)
      .sort((a, b) => new Date(a) - new Date(b))
      .map((key) => monthMap[key]);

    setMonthlyData(data);
  };

  const handleNaviateToExpense = () => {
    navigate('/expense');
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>📊 Financial Dashboard</h1>
        <p>Your expense analytics and insights</p>
      </div>

      {/* Income Input Section */}
      <div className="income-input-section">
        <h2>💵 Monthly Total Income</h2>
        {editingIncome ? (
          <div className="income-edit-form">
            <input
              type="number"
              min="0"
              step="0.01"
              value={userIncome}
              onChange={e => setUserIncome(e.target.value)}
              placeholder="Enter your monthly income"
              className="income-input"
            />
            <button
              className="btn btn-success"
              onClick={() => {
                localStorage.setItem('userMonthlyIncome', userIncome);
                setEditingIncome(false);
              }}
            >Save</button>
            <button className="btn btn-secondary" onClick={() => setEditingIncome(false)}>Cancel</button>
          </div>
        ) : (
          <div className="income-display">
            <span className="income-value">₹{userIncome !== '' ? parseFloat(userIncome).toFixed(2) : 'Not set'}</span>
            <button className="btn btn-primary" onClick={() => setEditingIncome(true)}>
              {userIncome === '' ? 'Set Income' : 'Edit Income'}
            </button>
          </div>
        )}
        <p className="income-note">This value is used to manage your expenses and calculate ratios. You can update it anytime.</p>
      </div>

      <div className="dashboard-container">
        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card card-income">
            <div className="card-content">
              <h3>Total Income</h3>
              <p className="amount">₹{summaryData.totalIncome.toFixed(2)}</p>
            </div>
            <div className="card-icon">💰</div>
          </div>

          <div className="card card-expense">
            <div className="card-content">
              <h3>Total Expenses</h3>
              <p className="amount">₹{summaryData.totalExpense.toFixed(2)}</p>
            </div>
            <div className="card-icon">💸</div>
          </div>

          <div className={`card card-balance ${summaryData.balance >= 0 ? 'positive' : 'negative'}`}>
            <div className="card-content">
              <h3>Balance</h3>
              <p className="amount">₹{summaryData.balance.toFixed(2)}</p>
            </div>
            <div className="card-icon">{summaryData.balance >= 0 ? '✅' : '⚠️'}</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          {/* Monthly Trend */}
          <div className="chart-container full-width">
            <h2>💹 Monthly Trend (Last 6 Months)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
                  formatter={(value) => `₹${value.toFixed(2)}`}
                />
                <Legend />
                <Bar dataKey="income" fill="#4facfe" name="Income" />
                <Bar dataKey="expense" fill="#f5576c" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="chart-container half-width">
            <h2>🎯 Expense by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Categories */}
          <div className="chart-container half-width">
            <h2>🏆 Top 3 Categories</h2>
            <div className="top-categories">
              {topCategories.length === 0 ? (
                <p className="no-data">No expense data available</p>
              ) : (
                topCategories.map((category, index) => (
                  <div key={category.name} className="category-item">
                    <div className="rank-badge">{index + 1}</div>
                    <div className="category-info">
                      <span className="category-name">{category.name}</span>
                      <span className="category-amount">₹{category.value.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat">
            <h3>Total Transactions</h3>
            <p className="stat-value">{expenses.length}</p>
          </div>
          <div className="stat">
            <h3>Average Transaction</h3>
            <p className="stat-value">
              ₹
              {expenses.length > 0
                ? (
                    expenses.reduce((sum, e) => sum + parseFloat(e.expense_amount), 0) /
                    expenses.length
                  ).toFixed(2)
                : '0.00'}
            </p>
          </div>
          <div className="stat">
            <h3>Expense Ratio</h3>
            <p className="stat-value">
              {summaryData.totalIncome > 0
                ? ((summaryData.totalExpense / summaryData.totalIncome) * 100).toFixed(1)
                : '0'}
              %
            </p>
          </div>
          <div className="stat">
            <h3>Savings Rate</h3>
            <p className="stat-value">
              {summaryData.totalIncome > 0
                ? (((summaryData.totalIncome - summaryData.totalExpense) / summaryData.totalIncome) * 100).toFixed(1)
                : '0'}
              %
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="dashboard-action">
          <button className="btn btn-primary" onClick={handleNaviateToExpense}>
            Add New Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
