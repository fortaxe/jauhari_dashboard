import { useEffect, useState, createContext, useContext } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import UserManagement from './pages/Users/[id]/UserManagement';
import Otp from './pages/Authentication/Otp';
import Users from './pages/Users';
import PaymentInfo from "./pages/paymentInfo/Index";

// Create authentication context
const AuthContext = createContext({
  isAuthenticated: false,
  setAuthenticated: (value: boolean) => {},
});

const useAuth = () => useContext(AuthContext);

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth/signin" replace />;
};

// App Component
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Check if token is present in localStorage
    // localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTZkODVmZWVmOTFlYmViYzA5M2IyYyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNzk3NDM1Nn0.7uxsM1ziZRfBcfDm-89X6whMcB_cVQcADnkGD1X4CcA');
    const token = localStorage.getItem('authToken');
    setAuthenticated(!!token);

    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const authContextValue = { isAuthenticated, setAuthenticated };

  if (loading) return <Loader />;

  return (
    <AuthContext.Provider value={authContextValue}>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/otp" element={<Otp />} />

        {/* Protected Routes */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <PageTitle title="Dashboard | Jauhari - Admin Dashboard" />
                        <Dashboard />
                      </>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <>
                        <PageTitle title="User Management | Jauhari - Admin Dashboard" />
                        <Users />
                        {/* <UserManagement /> */}
                      </>
                    }
                  />
                  <Route
                    path="/users/:id"
                    element={
                      <>
                        <PageTitle title="User Management | Jauhari - Admin Dashboard" />
                        <UserManagement />
                      </>
                    }
                  />
                  <Route path="/payment-info" element={<PaymentInfo />} />
                  <Route
                    path="/profile"
                    element={
                      <>
                        <PageTitle title="Profile | Jauhari - Admin Dashboard" />
                        <Profile />
                      </>
                    }
                  />
                  <Route
                    path="/forms/form-elements"
                    element={
                      <>
                        <PageTitle title="Form Elements | Jauhari - Admin Dashboard" />
                        <FormElements />
                      </>
                    }
                  />
                  <Route
                    path="/forms/form-layout"
                    element={
                      <>
                        <PageTitle title="Form Layout | Jauhari - Admin Dashboard" />
                        <FormLayout />
                      </>
                    }
                  />
                  <Route
                    path="/tables"
                    element={
                      <>
                        <PageTitle title="Tables | Jauhari - Admin Dashboard" />
                        <Tables />
                      </>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <>
                        <PageTitle title="Settings | Jauhari - Admin Dashboard" />
                        <Settings />
                      </>
                    }
                  />
                  <Route
                    path="/chart"
                    element={
                      <>
                        <PageTitle title="Basic Chart | Jauhari - Admin Dashboard" />
                        <Chart />
                      </>
                    }
                  />
                  <Route
                    path="/ui/alerts"
                    element={
                      <>
                        <PageTitle title="Alerts | Jauhari - Admin Dashboard" />
                        <Alerts />
                      </>
                    }
                  />
                  <Route
                    path="/ui/buttons"
                    element={
                      <>
                        <PageTitle title="Buttons | Jauhari - Admin Dashboard" />
                        <Buttons />
                      </>
                    }
                  />

                </Routes>

              </DefaultLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
