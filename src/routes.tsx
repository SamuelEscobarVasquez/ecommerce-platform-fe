import { Navigate, useRoutes } from 'react-router-dom';
import { PublicLayout } from './layout/public/PublicLayout';
import { ProtectedRoute } from './core/auth/ProtectedRoute';
import { lazy, Suspense } from 'react';
import { BackofficeLayout } from './layout/backoffice/BackofficeLayout';

const Login = lazy(() => import('./modules/public/auth/views/Login'));
const Register = lazy(() => import('./modules/public/auth/views/Register'));
const ProductListViewPublic = lazy(() => import('./modules/public/products/views/ProductListViewPublic'));
const ProductsView = lazy(() => import('./modules/backoffice/products/views/ProductsView'));
const ProductCreateView = lazy(() => import('./modules/backoffice/products/views/ProductCreateView'));
const ProductEditView = lazy(() => import('./modules/backoffice/products/views/ProductEditView'));

export function AppRoutes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        { path: '', element: <Navigate to="/login" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'products-list', element: <ProductListViewPublic /> },
        { path: '*', element: <Navigate to="/login" replace /> },
      ],
    },
    {
      path: '/backoffice',
      element: (
        <ProtectedRoute roles={['Administrador', 'Colaborador']}>
          <BackofficeLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate to="products" replace /> },
        {
          path: 'products',
          element: (
            <ProtectedRoute roles={['Administrador', 'Colaborador']}>
              <ProductsView />
            </ProtectedRoute>
          ),
        },
        {
          path: 'products/new',
          element: (
            <ProtectedRoute roles={['Administrador', 'Colaborador']}>
              <ProductCreateView />
            </ProtectedRoute>
          ),
        },
        {
          path: 'products/:id/edit',
          element: (
            <ProtectedRoute roles={['Administrador', 'Colaborador']}>
              <ProductEditView />
            </ProtectedRoute>
          ),
        },
        { path: 'unauthorized', element: <Login /> },
      ],
    },
  ]);
  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
}