import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Expense.css';

const PremiumDashboard = () => {
  const [expenseAmount, setExpenseAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('food');
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [paginationData, setPaginationData] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const { token, isPremium } = useAuth();
  const navigate = useNavigate();

  const fetchExpenses = useCallback(async (page = 1) => {
    try {
      const response = await axios.get(`https://full-expense-app.onrender.com/get_expense?page=${page}&itemsPerPage=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(response.data.getExpense);
      setPaginationData({
        currentPage: response.data.currentPage,
        hasNextPage: response.data.hasNextPage,
        nextPage: response.data.nextPage,
        hasPreviousPage: response.data.hasPreviousPage,
        previousPage: response.data.previousPage,
      });
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }, [itemsPerPage, token]);

  useEffect(() => {
    if (!isPremium) {
      navigate('/expense');
      return;
    }
    fetchExpenses();
  }, [itemsPerPage, isPremium, navigate, fetchExpenses]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!expenseAmount || !description) {
      alert('Please fill all fields');
      return;
    }

    try {
      await axios.post(
        'https://full-expense-app.onrender.com/expense',
        {
          expense_amount: expenseAmount,
          description,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh expenses list
      fetchExpenses(1);
      setExpenseAmount('');
      setDescription('');
      setCategory('food');
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Error adding expense');
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await axios.delete(`https://full-expense-app.onrender.com/delete_expense/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchExpenses(currentPage);
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Error deleting expense');
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const response = await axios.get('https://full-expense-app.onrender.com/download', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      // Create a blob URL from the response
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const today = new Date();
      const dateString = today.toLocaleDateString('en-GB').replace(/\//g, '-');
      link.setAttribute('download', `expenses_${dateString}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
      alert('Error downloading CSV file');
    }
  };

  const handleShowDetails = () => {
    navigate('/expense-details');
  };

  const handleShowLeaderboard = async () => {
    if (showLeaderboard) {
      setShowLeaderboard(false);
      return;
    }

    try {
      const response = await axios.get('https://full-expense-app.onrender.com/AllData', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Sort by totalExpense in descending order
      const sortedData = response.data.sort(
        (a, b) => (b.totalExpense || 0) - (a.totalExpense || 0)
      );
      setLeaderboard(sortedData);
      setShowLeaderboard(true);
    } catch (err) {
      console.log(err);
      alert('Error loading leaderboard');
    }
  };

  return (
    <div className="expense-wrapper">
      <div className="expense-header">
        <h1>Premium Dashboard</h1>
      </div>

      <div className="expense-container">
        <form className="expense-form" onSubmit={handleAddExpense}>
          <h2>Premium Expense App</h2>

          <div className="form-group">
            <label htmlFor="amount">Enter Expense Amount</label>
            <input
              type="number"
              id="amount"
              placeholder="Amount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Choose Description</label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Choose Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="food">Food</option>
              <option value="fuel">Fuel</option>
              <option value="electricity">Electricity</option>
              <option value="movie">Movie</option>
              <option value="Income">Income</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Expenses
          </button>

          <div className="premium-features">
            <h3>✨ Premium User Features ✨</h3>
            <div className="premium-buttons">
              <button
                type="button"
                className="btn btn-premium"
                onClick={handleShowLeaderboard}
              >
                {showLeaderboard ? 'Hide' : 'Show'} Leaderboard
              </button>
              <button
                type="button"
                className="btn btn-premium"
                onClick={handleDownloadCSV}
              >
                Download CSV
              </button>
              <button
                type="button"
                className="btn btn-premium"
                onClick={handleShowDetails}
              >
                Details
              </button>
            </div>
          </div>
        </form>

        <div className="detail-container">
          <h2 id="form2">Your Expenses</h2>
          <ul className="expense-list">
            {expenses.length === 0 ? (
              <li className="empty-state">No expenses found</li>
            ) : (
              expenses.map((expense) => (
                <li key={expense._id} className="expense-item">
                  <span>
                    {expense.expense_amount} - {expense.description} - {expense.category}
                  </span>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => handleDeleteExpense(expense._id)}
                  >
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>

          <div className="pagination-section">
            <div className="pagination">
              {paginationData.hasPreviousPage && (
                <button
                  className="btn btn-nav"
                  onClick={() => fetchExpenses(paginationData.previousPage)}
                >
                  ← Previous
                </button>
              )}
              <button className="btn btn-current" disabled>
                Page {paginationData.currentPage}
              </button>
              {paginationData.hasNextPage && (
                <button
                  className="btn btn-nav"
                  onClick={() => fetchExpenses(paginationData.nextPage)}
                >
                  Next →
                </button>
              )}
            </div>

            <div className="items-per-page">
              <label htmlFor="itemsPerPage">Show per page:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>

        {showLeaderboard && (
          <div className="leaderboard-container">
            <h2 className="leaderboard-title">Leaderboard - Top Users by Total Expenses</h2>
            <ul className="leaderboard-list">
              {leaderboard.length === 0 ? (
                <li className="empty-state">No users found</li>
              ) : (
                leaderboard.map((userEntry, index) => {
                  const userName = userEntry.user?.Username || 'Unknown User';
                  const totalExpense = userEntry.totalExpense || 0;
                  return (
                    <li key={userEntry._id} className="user-entry">
                      <span className="user-rank">#{index + 1}</span>
                      <span className="user-name">{userName}</span>
                      <span className="total-expenses">₹{totalExpense}</span>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumDashboard;
