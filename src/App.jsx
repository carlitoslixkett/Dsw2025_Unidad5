// src/App.jsx
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { AuthProvider } from "./modules/auth/context/AuthProvider";

// AUTH
import LoginPage from "./modules/auth/pages/LoginPage";
import SignupPage from "./modules/auth/pages/SignupPage";

// CLIENT
import ClientHome from "./modules/home/pages/Home";
import CartPage from "./modules/cart/pages/CartPage";

// ADMIN
import ProtectedRoute from "./modules/auth/components/ProtectedRoute";
import DashboardLayout from "./modules/admin/components/DashboardLayout";
import HomeAdmin from "./modules/admin/pages/HomeAdmin";
import ListProductsPage from "./modules/products/pages/ListProductsPage";
import CreateProductPage from "./modules/products/pages/CreateProductPage";
import ListOrdersPage from "./modules/orders/pages/ListOrdersPage";
import CreateUserPage from "./modules/admin/pages/CreateUserPage";
import UserCreatedSuccess from "./modules/admin/pages/UserCreatedSuccess";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        { path: "/", element: <ClientHome /> },
        { path: "/cart", element: <CartPage /> },
      ],
    },

    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },

    {
      path: "/admin",
      element: (
        <ProtectedRoute role="admin">
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "home", element: <HomeAdmin /> },
        { path: "products", element: <ListProductsPage /> },
        { path: "products/create", element: <CreateProductPage /> },
        { path: "orders", element: <ListOrdersPage /> },
        { path: "create-user", element: <CreateUserPage /> },
        { path: "user-created", element: <UserCreatedSuccess /> },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

