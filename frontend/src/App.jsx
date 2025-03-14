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
import BookForm from './views/BookFormPage'
import NavbarHomepage from './components/NavbarHomepage';
import StudentLoans from './views/StudentLoans';
import StudentAbout from './views/StudentAbout';
import StudentSupport from './views/StudentSupport';

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

        {/*Estudiante-homepage*/}
        <Route path="/student-homepage" element={
          <ProtectedRoute allowedRoles={["student", "librarian", "super admin"]}>
            <StudentHomepage />
          </ProtectedRoute>
        } />

        {/*Estudiante-catálogo*/}
        <Route path="/catalogo" element={
          <ProtectedRoute allowedRoles={["student", "librarian", "super admin"]}>
            <StudentCatalog />
            <NavbarHomepage />
          </ProtectedRoute>
        } />

        {/*Estudiante-soporte*/}
        <Route path="/soporte" element={
          <ProtectedRoute allowedRoles={["student", "librarian", "super admin"]}>
            <StudentSupport />
            <NavbarHomepage />
          </ProtectedRoute>
        } />


        {/*Estudiante-préstamos*/}
        <Route path="/prestamos" element={
          <ProtectedRoute allowedRoles={["student", "librarian", "super admin"]}>
            <StudentLoans />
            <NavbarHomepage />
          </ProtectedRoute>
        } />

        {/*Estudiante-nosotros*/}
        <Route path="/nosotros" element={
          <ProtectedRoute allowedRoles={["student", "librarian", "super admin"]}>
            <StudentAbout />
            <NavbarHomepage />
          </ProtectedRoute>
        } />



        {/*Bibliotecario-dashboard*/}
        <Route path="/librarian-dashboard" element={
          <ProtectedRoute allowedRoles={["librarian"]}>
            <LibrarianDashboard />
          </ProtectedRoute>
        } />

        {/*Admin-dashboard*/}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRoles={["super admin", "student"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/*Inventario-libros*/}
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

        {/*Usuario*/}
        <Route path="/security/users" element={
          <ProtectedRoute allowedRoles={["super admin", "student"]}>
            <UsersPage />
          </ProtectedRoute>
        } />

        {/*Perfiles*/}
        <Route path="/security/profiles" element={
          <ProtectedRoute allowedRoles={["super admin", "student"]}>
            <ProfilesPage />
          </ProtectedRoute>
        } />


        <Route path="*" element={<Navigate to={getDashboardRoute()} />} />
      </Routes>
    </Router>
  );
}

export default App;