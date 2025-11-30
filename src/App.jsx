import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './modules/auth/context/AuthProvider';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';

// AUTH
import LoginPage from './modules/auth/pages/LoginPage';
import SignupPage from "./modules/auth/pages/SignupPage";


// ADMIN LAYOUT
import DashboardLayout from './modules/admin/components/DashboardLayout';

// ADMIN PAGES
import Home from './modules/home/pages/Home';
import ListProductsPage from './modules/products/pages/ListProductsPage';
import CreateProductPage from './modules/products/pages/CreateProductPage';
import ListOrdersPage from './modules/orders/pages/ListOrdersPage';

// CLIENT PAGES
import ClientHome from './modules/home/pages/Home'; 
import CartPage from './modules/cart/pages/CartPage'; // si ya lo tenés

function App() {
  const router = createBrowserRouter([
    //---------------------------------------------------------
    // CLIENTE / PÚBLICO
    //---------------------------------------------------------
    {
      path: '/',
      element: <Outlet />,
      children: [
        {
          path: '/',
          element: <ClientHome />,
        },
        {
          path: '/cart',
          element: <CartPage />,
        },
      ],
    },

    {
  path: "/signup",
  element: <SignupPage />,
},


    //---------------------------------------------------------
    // LOGIN
    //---------------------------------------------------------
    {
      path: '/login',
      element: <LoginPage />,
    },

    
    //---------------------------------------------------------
    // ADMIN (PROTEGIDO POR ROL)
    //---------------------------------------------------------
    {
  path: '/admin',
  element: (
    <ProtectedRoute role="Admin">
      <DashboardLayout />
    </ProtectedRoute>
  ),
  children: [
    { path: 'home', element: <Home /> },
    { path: 'products', element: <ListProductsPage /> },
    { path: 'products/create', element: <CreateProductPage /> },
    { path: 'orders', element: <ListOrdersPage /> },
  ],
}

  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );



}

export default App;
