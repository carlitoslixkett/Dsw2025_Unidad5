// src/App.jsx
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

// AUTH / CONTEXT
import { AuthProvider } from './modules/auth/context/AuthProvider';
import ProtectedRoute from './modules/auth/components/ProtectedRoute'; // Se repite en Admin, pero lo dejamos aquí con Auth
import LoginPage from './modules/auth/pages/LoginPage';
import SignupPage from "./modules/auth/pages/SignupPage";

// ADMIN LAYOUT
import DashboardLayout from './modules/admin/components/DashboardLayout';

// ADMIN PAGES
import HomeAdmin from "./modules/admin/pages/HomeAdmin";
import ListProductsPage from './modules/products/pages/ListProductsPage';
import CreateProductPage from './modules/products/pages/CreateProductPage';
import ProductDetailPage from './modules/products/pages/ProductDetailPage'; // Agregada en Current
import ListOrdersPage from './modules/orders/pages/ListOrdersPage';
import OrderDetailPage from './modules/orders/pages/OrderDetailPage'; // Agregada en Current
import CreateUserPage from "./modules/admin/pages/CreateUserPage.jsx";
import UserCreatedSuccess from "./modules/admin/pages/UserCreatedSuccess";
import EditProductPage from './modules/products/pages/EditProductPage';

// CLIENT PAGES
import ClientHome from './modules/home/pages/Home';
import CartPage from './modules/cart/pages/CartPage';
import ProfilePage from './modules/home/pages/ProfilePage';       
import ClientOrdersPage from './modules/home/pages/ClientOrdersPage'
import ClientOrderDetailPage from './modules/home/pages/ClientOrderDetailPage';
import CheckoutPage from "./modules/cart/pages/CheckoutPage";
import ClientProductDetailPage from './modules/home/pages/ClientProductDetailPage';

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
        { path: '/products/:id', element: <ClientProductDetailPage /> },
        { path: '/cart', element: <CartPage /> },
        { path: '/profile', element: <ProfilePage /> },
        { path: '/orders', element: <ClientOrdersPage /> }, //  Mis pedidos
        { path: '/orders/:id', element: <ClientOrderDetailPage /> },
        { path: "/checkout", element: <CheckoutPage />,}     
      ],
    },

    { path: "/signup", element: <SignupPage /> }, // Solo estaba en Current (derecha)
    { path: "/login", element: <LoginPage /> },

    //---------------------------------------------------------
    // ADMIN (PROTEGIDO POR ROL)
    //---------------------------------------------------------
    {
      path: "/admin",
      element: (
        <ProtectedRoute role="admin"> {/* Usamos 'admin' de Incoming, ya que el casing ('Admin' vs 'admin') podría importar */}
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "home", element: <HomeAdmin /> },
        { path: "products", element: <ListProductsPage /> },
        { path: "products/create", element: <CreateProductPage /> },
        { path: "products/:id", element: <ProductDetailPage /> }, // Agregada en Current
        { path: "products/:id/edit", element: <EditProductPage /> },
        { path: "orders", element: <ListOrdersPage /> },
        { path: "orders/:id", element: <OrderDetailPage /> }, // Agregada en Current
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
