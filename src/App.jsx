import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SidebarProvider } from './contexts/SidebarContext';
import { GlobeDemo } from './components/magicui/GlobeDemo';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const Dashboard = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./pages/Dashboard')), 6000);
  });
});

// const Globe = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import('./components/magicui/Globe.tsx')), 2000);
//   });
// });

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#171F2E]">
        <GlobeDemo />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-[#171F2E]"><GlobeDemo /></div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Suspense>
      </Router>
    </SidebarProvider>
  );
}

export default App;
