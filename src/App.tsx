import { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile';
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
import { WithdrawalSearchProvider } from "./context/WithdrawalHistoryContext";
import WithdrawalHistory from "./pages/WithdrawalHistory/Index";

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
        <WithdrawalSearchProvider>
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
                      <Route
                        path="/plan"
                        element={
                          <>
                            <PageTitle title="Plans | Jauhari - Admin Dashboard" />
                            <Plan />
                          </>
                        }
                      />
                      <Route path="/payment-info" 
                      
                      element={
                        <>
                        <PageTitle title="Payment Info | Jauhari - Admin Dashboard" />
                      <PaymentInfo />
                      </>
                      } />
                      <Route
                        path="/withdrawal-history"
                        element={
                          <>
                            <PageTitle title="Withdrawal History | Jauhari - Admin Dashboard" />
                            <WithdrawalHistory />
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
        </WithdrawalSearchProvider>
      </TransactionSearchProvider>
    </SearchProvider>


  );
}

export default App;
