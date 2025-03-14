import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login_Register from './views/Login_Register';
import StudentDashboard from './views/StudentDashboard';
import LibrarianDashboard from './views/LibrarianDashboard';
import AdminDashboard from './views/AdminDashboard';
import UsersPage from './views/UsersPage'; // Nueva página para Usuarios
import ProfilesPage from './views/ProfilesPage'; // Nueva página para Perfiles
import ProtectedRoute from './components/ProtectedRoute'; // Importa la protección de rutas
import BooksPage from './views/BooksPage'
import BookForm from './views/BookFormPage'
import ArticlesPage from './views/ArticlesPage';
import MagazinesPage from './views/MagazinesPage';
import ThesesPage from './views/ThesesPage';

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
          <ProtectedRoute allowedRoles={["super admin", "student"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/inventory/books" element={
          <ProtectedRoute allowedRoles={["super admin","student"]}>
            <BooksPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/articles" element={
          <ProtectedRoute allowedRoles={["super admin","student"]}>
            <ArticlesPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/magazines" element={
          <ProtectedRoute allowedRoles={["super admin","student"]}>
            <MagazinesPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/theses" element={
          <ProtectedRoute allowedRoles={["super admin","student"]}>
            <ThesesPage />
          </ProtectedRoute>
        } />

        <Route path="/book/form" element={
          <ProtectedRoute allowedRoles={["super admin","student"]}>
            <BookForm/>
          </ProtectedRoute>
        } />

        Nuevas rutas para Usuarios y Perfiles
        <Route path="/security/users" element={
<<<<<<< HEAD
          <ProtectedRoute allowedRoles={["super admin","student"]}>
=======
          <ProtectedRoute allowedRoles={["super admin", "student"]}>
>>>>>>> origin/yegli-uru
            <UsersPage />
          </ProtectedRoute>
        } />

        <Route path="/security/profiles" element={
<<<<<<< HEAD
          <ProtectedRoute allowedRoles={["super admin","student"]}>
=======
          <ProtectedRoute allowedRoles={["super admin", "student"]}>
>>>>>>> origin/yegli-uru
            <ProfilesPage />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to={getDashboardRoute()} />} />
      </Routes>
    </Router>
  );
}

export default App;