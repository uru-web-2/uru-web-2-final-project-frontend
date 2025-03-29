import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login_Register from './views/Login_Register';
import Homepage from './views/Homepage';
import LibrarianDashboard from './views/LibrarianDashboard';
import AdminDashboard from './views/AdminDashboard';
import UsersPage from './views/UsersPage'; // Nueva página para Usuarios
import ProfilesPage from './views/ProfilesPage'; // Nueva página para Perfiles
import ProtectedRoute from './components/ProtectedRoute'; // Importa la protección de rutas
import BooksPage from './views/BooksPage'
import ArticlesPage from './views/ArticlesPage'
import MagazinesPage from './views/MagazinesPage'
import ThesesPage from './views/ThesesPage'
import PermissionsPage from './views/PermissionsPage'; // Nueva página para Permisos
import BookFormPage from './views/BookFormPage';
import ArticleFormPage from './views/ArticleFormPage';
import MagazineFormPage from './views/MagazineFormPage';
import ThesisFormPage from './views/ThesisFormPage';
import BookDetailsPage from './views/BookDetailsPage';
import ArticleDetailsPage from './views/ArticleDetailsPage';
import MagazineDetailsPage from './views/MagazineDetailsPage';
import ThesisDetailsPage from './views/ThesisDetailsPage';
import StudentBooking from '../src/views/StudentViews/StudentBooking';
import StudentFavorites from '../src/views/StudentViews/StudentFavorites';
import StudentLoans from '../src/views/StudentViews/StudentLoans';
import StudentProfile from '../src/views/StudentViews/StudentProfile';
import GridCategories from '../src/views/GridCategories';

import { GlobalLoader } from './components/LoadingComponente';


function App() {
  const getDashboardRoute = () => {
    const roles = JSON.parse(sessionStorage.getItem("selectedRoles"));
    console.log(roles);

    if(!roles || !Array.isArray(roles)) {
      return "/homepage"
    }
    
    const routes = {
      "Student": "/homepage",
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

      <GlobalLoader /> {/* Componente de carga global */}

      <Routes>
      
        <Route path="/login" element={isAuthenticated() ? <Navigate to={getDashboardRoute()} /> : <Login_Register />} />

        {/*Student Module */}

        <Route path="/student-booking" element={
          <ProtectedRoute allowedRoles={["Student", "Librarian", "Super Admin"]}>
              <StudentBooking />
          </ProtectedRoute>
        } />

        <Route path="/student-favorites" element={
          <ProtectedRoute allowedRoles={["Student", "Librarian", "Super Admin"]}>
              <StudentFavorites />
          </ProtectedRoute>
        } />

        <Route path="/student-loans" element={
          <ProtectedRoute allowedRoles={["Student", "Librarian", "Super Admin"]}>
              <StudentLoans />
          </ProtectedRoute>
        } />

        <Route path="/student-profile" element={
          <ProtectedRoute allowedRoles={["Student", "Librarian", "Super Admin"]}>
              <StudentProfile/>
          </ProtectedRoute>
        } />

        <Route path="/homepage" element={
              <Homepage />
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
        

        <Route path="/inventory/books/form" element={
          <ProtectedRoute allowedRoles={["Super admin","Student"]}>
            <BookFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/magazines/form" element={
          <ProtectedRoute allowedRoles={["Super admin","Student"]}>
            <MagazineFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/articles/form" element={
          <ProtectedRoute allowedRoles={["Super admin","Student"]}>
            <ArticleFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/theses/form" element={
          <ProtectedRoute allowedRoles={["Super admin","Student"]}>
            <ThesisFormPage />
          </ProtectedRoute>
        } />
        

        <Route path="/inventory/books/form" element={
          <ProtectedRoute allowedRoles={["Super admin","Student"]}>
            <BookFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/magazines/form" element={
          <ProtectedRoute allowedRoles={["Super admin","Student"]}>
            <MagazineFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/articles/form" element={
          <ProtectedRoute allowedRoles={["Super admin","Student"]}>
            <ArticleFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/theses/form" element={
          <ProtectedRoute allowedRoles={["Super admin","Student"]}>
            <ThesisFormPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/books" element={
          <ProtectedRoute allowedRoles={["Super Admin","Student"]}>
            <BooksPage />
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

        <Route path="/inventory/books/detail/:id" element={
          <ProtectedRoute allowedRoles={["Student", "Librarian", "Super Admin"]}>
            <BookDetailsPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/articles/detail/:id" element={
          <ProtectedRoute allowedRoles={["Student", "Librarian", "Super Admin"]}>
            <ArticleDetailsPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/magazines/detail/:id" element={
          <ProtectedRoute allowedRoles={["Student", "Librarian", "Super Admin"]}>
            <MagazineDetailsPage />
          </ProtectedRoute>
        } />

        <Route path="/inventory/theses/detail/:id" element={
          <ProtectedRoute allowedRoles={["Student", "Librarian", "Super Admin"]}>
            <ThesisDetailsPage />
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

        <Route path= "/inventory/loans" element={
          <ProtectedRoute allowedRoles={["Student", "Librarian", "Super Admin"]}>
            <GridCategories />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to={getDashboardRoute()} />} />
      </Routes>
    </Router>
  );
}

export default App;