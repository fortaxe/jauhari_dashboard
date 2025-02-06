import { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
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
import { Toaster } from "react-hot-toast";
import { SearchProvider } from "./context/SearchContext";
import { useAuth } from "./context/AuthContext";
import Plan from "./pages/plan";


//Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth/signin" replace />;
};

// App Component
function App() {
 
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);



  return (
   
      <SearchProvider>
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
                        <Users  />
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
                    <Route
                    path="/plan"
                    element={
                      <>
                        <PageTitle title="Plans | Jauhari - Admin Dashboard" />
                        <Plan />
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

      <Toaster />
    
      </SearchProvider> 
      
     
  );
}

export default App;
