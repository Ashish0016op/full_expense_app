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
