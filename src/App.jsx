import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

// AUTH / CONTEXT
import { AuthProvider } from './modules/auth/context/AuthProvider';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';
import LoginPage from './modules/auth/pages/LoginPage';
import SignupPage from "./modules/auth/pages/SignupPage";

// ADMIN LAYOUT
import DashboardLayout from './modules/admin/components/DashboardLayout';

// ADMIN PAGES
import HomeAdmin from "./modules/admin/pages/HomeAdmin";
import ListProductsPage from './modules/products/pages/ListProductsPage';
import CreateProductPage from './modules/products/pages/CreateProductPage';
import ProductDetailPage from './modules/products/pages/ProductDetailPage';
import ListOrdersPage from './modules/orders/pages/ListOrdersPage';
import OrderDetailPage from './modules/orders/pages/OrderDetailPage';
import CreateUserPage from "./modules/admin/pages/CreateUserPage.jsx";
import UserCreatedSuccess from "./modules/admin/pages/UserCreatedSuccess";

// CLIENT PAGES
import ClientHome from './modules/home/pages/Home';
import CartPage from './modules/cart/pages/CartPage';

function App() {
  const router = createBrowserRouter([
    //---------------------------------------------------------
    // CLIENTE / PÚBLICO
    //---------------------------------------------------------
    {
      path: '/',
      element: <Outlet />,
      children: [
        { path: '/', element: <ClientHome /> },
        { path: '/cart', element: <CartPage /> },
      ],
    },

    { path: "/signup", element: <SignupPage /> }, // solo cliente
    { path: "/login", element: <LoginPage /> },

    //---------------------------------------------------------
    // ADMIN (PROTEGIDO POR ROL)
    //---------------------------------------------------------
    {
      path: "/admin",
      element: (
        <ProtectedRoute role="Admin">
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "home", element: <HomeAdmin /> },
        { path: "products", element: <ListProductsPage /> },
        { path: "products/create", element: <CreateProductPage /> },
        { path: "products/:id", element: <ProductDetailPage /> },
        { path: "orders", element: <ListOrdersPage /> },
        { path: "orders/:id", element: <OrderDetailPage /> },
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


