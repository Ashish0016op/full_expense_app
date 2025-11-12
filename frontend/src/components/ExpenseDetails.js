import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Expense.css';

const ExpenseDetails = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, isPremium } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPremium) {
      navigate('/expense');
      return;
    }

    const fetchExpenseDetails = async () => {
      try {
        const response = await axios.get('/get_expense?page=1&itemsPerPage=1000', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpenses(response.data.getExpense);
      } catch (error) {
        console.error('Error fetching expense details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenseDetails();
  }, [isPremium, navigate, token]);

  const handleGoBack = () => {
    navigate('/premium-dashboard');
  };

  if (loading) {
    return (
      <div className="expense-wrapper">
        <div className="expense-header">
          <h1>Expense Details</h1>
        </div>
        <div className="expense-container">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-wrapper">
      <div className="expense-header">
        <h1>Expense Details</h1>
      </div>

      <div className="expense-container">
        <button onClick={handleGoBack} className="btn btn-secondary" style={{ marginBottom: '20px' }}>
          ← Back to Premium Dashboard
        </button>

        <div className="detail-container">
          <h2 id="form2">All Your Expenses</h2>
          {expenses.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>No expenses found</p>
          ) : (
            <table className="details-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td>{new Date(expense.createdAt).toLocaleDateString()}</td>
                    <td>{expense.description}</td>
                    <td>{expense.category}</td>
                    <td>₹{expense.expense_amount}</td>
                    <td>{expense.category === 'Income' ? 'Income' : 'Expense'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetails;
