import { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard/Dashboard';
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
import RecentTransactions from "./pages/RecentTransactions";
import { TransactionSearchProvider } from "./context/TransactionSearchContext";

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
         <TransactionSearchProvider>
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
                    path="/recent-transactions"
                    element={
                     
                      <>
                        <PageTitle title="Recent Transactions | Jauhari - Admin Dashboard" />
                       
                        <RecentTransactions />
                      
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
      </TransactionSearchProvider>
      </SearchProvider> 
      
     
  );
}

export default App;
