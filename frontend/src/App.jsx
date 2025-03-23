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
      "Student": "/student-homepage",
      "Librarian": "/librarian-dashboard",
      "Super Admin": "/admin-dashboard",
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
          <ProtectedRoute allowedRoles={["Student", "Librarian", "Super Admin"]}>
            <StudentHomepage />
          </ProtectedRoute>
        } />

        <Route path="/catalogo" element={
          <ProtectedRoute allowedRoles={["student", "librarian", "super admin"]}>
            <StudentCatalog/>
          </ProtectedRoute>
        } />

        <Route path="/soporte" element={
          <ProtectedRoute allowedRoles={["Student", "Librarian", "Super Admin"]}>
            <StudentSupport />
          </ProtectedRoute>
        } />


        <Route path="/prestamos" element={
          <ProtectedRoute allowedRoles={["Student", "Librarian", "Super Admin"]}>
            <StudentLoans />
            <NavbarHomepage />
          </ProtectedRoute>
        } />

        <Route path="/nosotros" element={
          <ProtectedRoute allowedRoles={["Student", "Librarian", "Super Admin"]}>
            <StudentAbout />
            <NavbarHomepage />
          </ProtectedRoute>
        } />

        {/*Dashboards */}
        <Route path="/librarian-dashboard" element={
          <ProtectedRoute allowedRoles={["Librarian"]}>
            <LibrarianDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRoles={["Super Admin", "Student"]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/*Inventory Module */}
        <Route path="/inventory/books" element={
          <ProtectedRoute allowedRoles={["Super Admin","Student"]}>
            <BooksPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/books/form" element={
          <ProtectedRoute allowedRoles={["Super Admin","Student"]}>
            <BookFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/magazines/form" element={
          <ProtectedRoute allowedRoles={["Super Admin","Student"]}>
            <MagazineFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/articles/form" element={
          <ProtectedRoute allowedRoles={["Super Admin","Student"]}>
            <ArticleFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/theses/form" element={
          <ProtectedRoute allowedRoles={["Super Admin","Student"]}>
            <ThesisFormPage />
          </ProtectedRoute>
        } />
        

        <Route path="/inventory/books/form" element={
          <ProtectedRoute allowedRoles={["Super Admin","Student"]}>
            <BookFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/magazines/form" element={
          <ProtectedRoute allowedRoles={["Super Admin","Student"]}>
            <MagazineFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/articles/form" element={
          <ProtectedRoute allowedRoles={["Super Admin","Student"]}>
            <ArticleFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/theses/form" element={
          <ProtectedRoute allowedRoles={["Super Admin","Student"]}>
            <ThesisFormPage />
          </ProtectedRoute>
        } />
        

        <Route path="/inventory/articles" element={
          <ProtectedRoute allowedRoles={["Super Admin","Student"]}>
            <ArticlesPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/magazines" element={
          <ProtectedRoute allowedRoles={["Super Admin","Student"]}>
            <MagazinesPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/theses" element={
          <ProtectedRoute allowedRoles={["Super Admin","Student"]}>
            <ThesesPage />
          </ProtectedRoute>
        } />

        {/*Security Module */}
        <Route path="/security/users" element={
          <ProtectedRoute allowedRoles={["Super Admin", "Student"]}>
            <UsersPage />
          </ProtectedRoute>
        } />

        <Route path="/security/profiles" element={
          <ProtectedRoute allowedRoles={["Super Admin", "Student"]}>
            <ProfilesPage />
          </ProtectedRoute>
        } />

        <Route path="/security/permissions/:id" element={
          <ProtectedRoute allowedRoles={["Student", "Librarian", "Super Admin"]}>
            <PermissionsPage />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to={getDashboardRoute()} />} />
      </Routes>
    </Router>
  );
}

export default App;