import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MarkAttendance from './pages/MarkAttendance';
import ProtectedRoute from './routes/ProtectedRoutes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mark-attendance"
        element={
          <ProtectedRoute>
            <MarkAttendance />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
