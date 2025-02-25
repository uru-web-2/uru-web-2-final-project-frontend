import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login_Register from './views/Login_Register';
import StudentDashboard from './views/StudentDashboard';
import LibrarianDashboard from './views/LibrarianDashboard';
import AdminDashboard from './views/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Importa la protección de rutas

function App() {
  const getDashboardRoute = () => {
    const roles = JSON.parse(sessionStorage.getItem("selectedRoles"));
    console.log(roles);

    if(!roles || !Array.isArray(roles)) {
      return "/login";
    }
    
    const routes = {
      "student": "/student-dashboard",
      "librarian": "/librarian-dashboard",
      "super admin": "/admin-dashboard"
    };

    for (const role of roles) {
      if (routes[role]) {
        return routes[role];
      }
    }

    return "/login"; 
  };

  const isAuthenticated = () => {
    return sessionStorage.getItem("selectedRoles") !== null;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated() ? <Navigate to={getDashboardRoute()} /> : <Login_Register />} />

        <Route path="/student-dashboard" element={
          <ProtectedRoute allowedRoles={["student", "librarian", "super admin"]}>
            <StudentDashboard />
          </ProtectedRoute>
        } />

        <Route path="/librarian-dashboard" element={
          <ProtectedRoute allowedRoles={["librarian"]}>
            <LibrarianDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRoles={["super admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to={getDashboardRoute()} />} />
      </Routes>
    </Router>
  );
}

export default App;