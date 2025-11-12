<<<<<<< HEAD
# 💳 Advanced Expense Tracker Application

A comprehensive, full-featured expense tracking application with analytics, budgeting, and financial insights.

## 🌟 Features

### Core Features
- ✅ **Dashboard Analytics** - Charts, graphs, and financial summaries
- ✅ **Expense Management** - Add, edit, delete, and categorize expenses
- ✅ **Advanced Filtering** - Search and filter by date, amount, category
- ✅ **Spending Goals** - Set budgets and track progress
- ✅ **Premium Features** - Leaderboard, CSV export, detailed reports
- ✅ **User Authentication** - Secure login and registration
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

### Analytics & Reports
- 📊 Monthly income vs expense trends
- 🥧 Category-wise expense distribution
- 📈 Top spending categories ranking
- 📉 Financial metrics (savings rate, expense ratio)
- 📥 CSV export functionality

### Premium Features
- ⭐ Global leaderboard
- 💾 Download expense reports
- 📋 Detailed expense history
- 📊 Advanced analytics

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd expense_app
```

2. **Setup Backend**
```bash
cd full_expense_app
npm install
npm start
# Backend runs on http://localhost:5500
```

3. **Setup Frontend (new terminal)**
```bash
cd expense_app_react
npm install
npm start
# Frontend runs on http://localhost:3000
```

4. **Open in Browser**
```
http://localhost:3000
```

## 📖 Usage

### Create Account
1. Go to http://localhost:3000/signup
2. Enter email and password
3. Click "Create Account"

### Login
1. Go to http://localhost:3000/login
2. Enter your credentials
3. Click "Login"

### Add Expenses
1. Navigate to "My Expenses"
2. Fill in amount, description, and category
3. Click "Add Expense"

### View Analytics
1. Click "Dashboard"
2. See charts, graphs, and financial summaries
3. Analyze spending patterns

### Filter Expenses
1. Go to "My Expenses"
2. Use filter section to search and filter
3. Combine multiple filters for precise results

### Set Spending Goals
1. Navigate to "Goals" section
2. Click "Add New Goal"
3. Set target amount and deadline
4. Track progress with visual indicators

## 📁 Project Structure

```
expense_app/
├── expense_app_react/          # Frontend React app
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── context/           # Auth context
│   │   ├── styles/            # CSS files
│   │   └── App.js             # Main app
│   ├── public/
│   └── package.json
├── full_expense_app/          # Backend Express app
│   ├── controllers/           # Business logic
│   ├── models/                # Database models
│   ├── routes/                # API routes
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- React 18.2.0
- React Router 6.17.0
- Axios
- Recharts
- date-fns
- CSS3

### Backend
- Express.js
- MongoDB
- JWT Authentication
- Razorpay (payments)

## 🎨 UI/UX

- **Modern Design** - Beautiful gradient backgrounds
- **Responsive Layout** - Mobile-first approach
- **Interactive Charts** - Real-time visualizations
- **Smooth Animations** - Engaging transitions
- **Intuitive Navigation** - Easy to use interface

## 🔐 Security

- JWT token-based authentication
- Password hashing
- Protected routes
- Secure API endpoints
- CORS enabled

## 📊 Pages & Routes

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | User authentication |
| Sign Up | `/signup` | User registration |
| Dashboard | `/dashboard` | Analytics & charts |
| Expenses | `/expense` | Manage expenses |
| Goals | `/goals` | Budget tracking |
| Premium | `/premium-dashboard` | Premium features |
| Details | `/expense-details` | Detailed reports |

## 📱 Responsive Breakpoints

- Desktop: 1920px+
- Tablet: 768px - 1024px
- Mobile: 320px - 767px

## 🎯 Key Components

### Dashboard.js
Interactive analytics dashboard with charts and summaries

### ExpenseWithFilters.js
Advanced expense management with filtering and search

### SpendingGoals.js
Goal creation and progress tracking

### Navigation.js
Sidebar navigation with user profile

### PremiumDashboard.js
Premium features like leaderboard and export

### ExpenseDetails.js
Detailed expense reports and data

## 💾 Data Persistence

- **MongoDB** - All expenses and user data
- **localStorage** - User tokens and goals
- **Session Storage** - Temporary data

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in .env or kill the process
npx kill-port 3000
npx kill-port 5500
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in config

### Styling Issues
- Clear browser cache
- Rebuild the project

## 📚 API Documentation

### Authentication Endpoints
- `POST /login` - User login
- `POST /signUp` - User registration
- `GET /user_login` - Check user exists

### Expense Endpoints
- `POST /expense` - Add expense
- `GET /get_expense` - Get expenses
- `DELETE /delete_expense/:id` - Delete expense
- `GET /download` - Export CSV

### Premium Endpoints
- `GET /AllData` - Get leaderboard
- `GET /success_trans` - Payment success

## 🎓 Learning Resources

This project demonstrates:
- React hooks and state management
- API integration
- Data visualization
- Authentication flow
- Responsive design
- Modern CSS techniques
- Full-stack development

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💼 Author

Ashish0016op

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests.

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Happy Tracking! 💰**

*Track your expenses, achieve your financial goals, and make smarter money decisions.*
=======
# Expense Tracker - React Frontend

A modern React-based frontend for the Expense Tracker application with beautiful UI and smooth user experience.

## Features

- 🔐 User Authentication (Login & Sign Up)
- 💰 Expense Management (Add, View, Delete)
- 📊 Pagination Support
- 🎨 Modern, Responsive Design
- 🔒 Protected Routes
- 📱 Mobile Friendly

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Express backend running on `http://localhost:5500`

## Installation

1. Navigate to the project directory:
```bash
cd expense_app_react
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```env
REACT_APP_API_URL=http://localhost:5500
```

## Running the Application

Start the React development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

**Important**: Make sure your Express backend is running on `http://localhost:5500` before starting the React app.

## Project Structure

```
src/
├── components/          # React components
│   ├── Login.js        # Login page
│   ├── SignUp.js       # Sign up page
│   └── Expense.js      # Expense management page
├── context/            # Context API for state management
│   └── AuthContext.js  # Authentication context
├── styles/             # CSS files
│   ├── App.css         # Global styles
│   ├── AuthPages.css   # Auth pages styles
│   └── Expense.css     # Expense page styles
├── App.js              # Main app component with routing
└── index.js            # Entry point

public/
└── index.html          # HTML template
```

## Available Routes

- `/login` - Login page
- `/signup` - Sign up page
- `/expense` - Expense management (protected route)

## API Integration

The app communicates with the following backend endpoints:

- `POST /login` - User login
- `POST /signUp` - User registration
- `GET /user_login` - Get all users (for validation)
- `POST /expense` - Add new expense
- `GET /get_expense` - Get user expenses with pagination
- `DELETE /delete_expense/:id` - Delete an expense

## Authentication

The app uses JWT tokens stored in localStorage for authentication:
- `token` - JWT authentication token
- `isPremium` - User premium status

## Future Enhancements

- [ ] Premium Dashboard component
- [ ] Expense Details component
- [ ] Leaderboard feature
- [ ] CSV Download functionality
- [ ] Forgot Password implementation
- [ ] User Profile management
- [ ] Dark mode support
- [ ] Advanced filtering and search

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Troubleshooting

**CORS Issues**: Make sure the Express backend is configured to accept requests from `http://localhost:3000`

**API Not Connecting**: Verify that the backend server is running on `http://localhost:5500`

**Port Already in Use**: If port 3000 is in use, you can change it:
```bash
PORT=3001 npm start
```

## License

MIT License - feel free to use this project for your own purposes.
>>>>>>> 46f7650 (Deploy React app to GitHub Pages)
