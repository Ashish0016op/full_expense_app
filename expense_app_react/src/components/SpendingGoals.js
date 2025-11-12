import React, { useState, useEffect } from 'react';
import '../styles/Goals.css';

const SpendingGoals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: 0,
    category: 'food',
    deadline: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = () => {
    const savedGoals = localStorage.getItem('spendingGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  };

  const saveGoals = (goalsArray) => {
    localStorage.setItem('spendingGoals', JSON.stringify(goalsArray));
    setGoals(goalsArray);
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) {
      alert('Please fill all fields');
      return;
    }

    const goal = {
      id: Date.now(),
      ...newGoal,
      targetAmount: parseFloat(newGoal.targetAmount),
      createdAt: new Date().toISOString(),
    };

    saveGoals([...goals, goal]);
    setNewGoal({
      name: '',
      targetAmount: '',
      currentAmount: 0,
      category: 'food',
      deadline: '',
    });
    setShowForm(false);
  };

  const handleDeleteGoal = (id) => {
    saveGoals(goals.filter((goal) => goal.id !== id));
  };

  const getGoalProgress = (goal) => {
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  };

  const getGoalStatus = (goal) => {
    const progress = getGoalProgress(goal);
    if (progress >= 100) return 'completed';
    if (progress >= 75) return 'warning';
    return 'active';
  };

  return (
    <div className="goals-wrapper">
      <div className="goals-header">
        <h1>🎯 Spending Goals</h1>
        <p>Set and track your spending goals to manage finances better</p>
      </div>

      <div className="goals-container">
        <button
          className="btn btn-primary add-goal-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Close' : '+ Add New Goal'}
        </button>

        {showForm && (
          <form className="goal-form" onSubmit={handleAddGoal}>
            <h2>Create New Spending Goal</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="goalName">Goal Name</label>
                <input
                  type="text"
                  id="goalName"
                  placeholder="e.g., Monthly Food Budget"
                  value={newGoal.name}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="targetAmount">Target Amount (₹)</label>
                <input
                  type="number"
                  id="targetAmount"
                  placeholder="5000"
                  value={newGoal.targetAmount}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, targetAmount: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="goalCategory">Category</label>
                <select
                  id="goalCategory"
                  value={newGoal.category}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, category: e.target.value })
                  }
                >
                  <option value="food">Food</option>
                  <option value="fuel">Fuel</option>
                  <option value="electricity">Electricity</option>
                  <option value="movie">Movie</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <input
                  type="date"
                  id="deadline"
                  value={newGoal.deadline}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, deadline: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Create Goal
            </button>
          </form>
        )}

        <div className="goals-list">
          {goals.length === 0 ? (
            <div className="empty-state">
              <p>No spending goals yet. Create one to get started! 🚀</p>
            </div>
          ) : (
            goals.map((goal) => (
              <div key={goal.id} className={`goal-card ${getGoalStatus(goal)}`}>
                <div className="goal-header">
                  <h3>{goal.name}</h3>
                  <button
                    className="btn-delete-goal"
                    onClick={() => handleDeleteGoal(goal.id)}
                    title="Delete goal"
                  >
                    ✕
                  </button>
                </div>

                <div className="goal-info">
                  <div className="info-item">
                    <span className="label">Target</span>
                    <span className="value">₹{goal.targetAmount.toFixed(2)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Current</span>
                    <span className="value">₹{goal.currentAmount.toFixed(2)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Category</span>
                    <span className="value">{goal.category}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Deadline</span>
                    <span className="value">{new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="goal-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${getGoalProgress(goal)}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {getGoalProgress(goal).toFixed(0)}% Complete
                  </span>
                </div>

                <div className="goal-remaining">
                  Remaining: ₹{Math.max(0, goal.targetAmount - goal.currentAmount).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SpendingGoals;
