import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrondLayout from "./components/layout/frond";
import HomePage from "./pages/public/Home/HomePage";
import CategoryPage from "./pages/public/Category/CategoryPage";
import BlogPage from "./pages/public/Blog/BlogPage";
import AboutPage from "./pages/public/About/AboutPage";
import RegisterPage from "./pages/public/Register/RegisterPage";
import LoginPage from "./pages/public/Login/LoginPage";
import { useContext } from "react";
import AccountPage from "./pages/common/Account/AccountPage";
import MyBlogs from "./pages/common/Myblogs/MyBlogs";
import CategoriesPage from "./pages/admin/Categories/CategoriesPage";
import UsersPage from "./pages/admin/users/UsersPage";
import NotFound from "./pages/public/NotFound/NotFound";
import AdminLayout from "./components/layout/admin";
import { AuthContext } from "./context/AuthContext";
import BlogsPage from "./pages/public/Blogs/BlogsPage";
import DashboardPage from "./pages/admin/Dashboard/Dashboard";

function App() {
  const { isAuthenticated, role } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrondLayout />}>
          <Route index element={<HomePage />} />
          <Route path="category/:idCategory" element={<CategoryPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="blogs/:blogId" element={<BlogPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          {isAuthenticated ? (
            <Route path="my-blogs" element={<MyBlogs />} />
          ) : null}
          {isAuthenticated ? (
            <Route path="account" element={<AccountPage />} />
          ) : null}
        </Route>
        {isAuthenticated && role === "admin" ? (
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
        ) : null}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
