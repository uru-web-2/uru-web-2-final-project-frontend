import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login_Register from './views/Login_Register';
import StudentHomepage from './views/StudentHomepage';
import LibrarianDashboard from './views/LibrarianDashboard';
import AdminDashboard from './views/AdminDashboard';
import UsersPage from './views/UsersPage'; // Nueva página para Usuarios
import ProfilesPage from './views/ProfilesPage'; // Nueva página para Perfiles
import ProtectedRoute from './components/ProtectedRoute'; // Importa la protección de rutas
import BooksPage from './views/BooksPage'
import ArticlesPage from './views/ArticlesPage'
import MagazinesPage from './views/MagazinesPage'
import ThesesPage from './views/ThesesPage'
import StudentCatalog from './views/StudentCatalog'
import PermissionsPage from './views/PermissionsPage'; // Nueva página para Permisos
import NavbarHomepage from './components/NavbarHomepage';
import StudentLoans from './views/StudentLoans';
import StudentAbout from './views/StudentAbout';
import StudentSupport from './views/StudentSupport';
import BookFormPage from './views/BookFormPage';
import ArticleFormPage from './views/ArticleFormPage';
import MagazineFormPage from './views/MagazineFormPage';
import ThesisFormPage from './views/ThesisFormPage';


function App() {
  const getDashboardRoute = () => {
    const roles = JSON.parse(sessionStorage.getItem("selectedRoles"));
    console.log(roles);

    if(!roles || !Array.isArray(roles)) {
      return "/login";
    }
    
    const routes = {
      "student": "/student-homepage",
      "librarian": "/librarian-dashboard",
      "super admin": "/admin-dashboard",
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

        {/*Student Module */}
        <Route path="/student-homepage" element={
          <ProtectedRoute allowedRoles={["student", "librarian", "super admin"]}>
            <StudentHomepage />
          </ProtectedRoute>
        } />

        <Route path="/catalogo" element={
          <ProtectedRoute allowedRoles={["student", "librarian", "super admin"]}>
            <StudentCatalog/>
          </ProtectedRoute>
        } />

        <Route path="/soporte" element={
          <ProtectedRoute allowedRoles={["student", "librarian", "super admin"]}>
            <StudentSupport />
          </ProtectedRoute>
        } />


        <Route path="/prestamos" element={
          <ProtectedRoute allowedRoles={["student", "librarian", "super admin"]}>
            <StudentLoans />
            <NavbarHomepage />
          </ProtectedRoute>
        } />

        <Route path="/nosotros" element={
          <ProtectedRoute allowedRoles={["student", "librarian", "super admin"]}>
            <StudentAbout />
            <NavbarHomepage />
          </ProtectedRoute>
        } />

        {/*Dashboards */}
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

        {/*Inventory Module */}
        <Route path="/inventory/books" element={
          <ProtectedRoute allowedRoles={["super admin","student"]}>
            <BooksPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/books/form" element={
          <ProtectedRoute allowedRoles={["super admin","student"]}>
            <BookFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/magazines/form" element={
          <ProtectedRoute allowedRoles={["super admin","student"]}>
            <MagazineFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/articles/form" element={
          <ProtectedRoute allowedRoles={["super admin","student"]}>
            <ArticleFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/theses/form" element={
          <ProtectedRoute allowedRoles={["super admin","student"]}>
            <ThesisFormPage />
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

        {/*Security Module */}
        <Route path="/security/users" element={
          <ProtectedRoute allowedRoles={["super admin", "student"]}>
            <UsersPage />
          </ProtectedRoute>
        } />

        <Route path="/security/profiles" element={
          <ProtectedRoute allowedRoles={["super admin", "student"]}>
            <ProfilesPage />
          </ProtectedRoute>
        } />

        <Route path="/security/permissions/:id" element={
          <ProtectedRoute allowedRoles={["student", "librarian", "super admin"]}>
            <PermissionsPage />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to={getDashboardRoute()} />} />
      </Routes>
    </Router>
  );
}

export default App;