import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import DebtsPage from "./pages/DebtsPage";
import PaymentPlanPage from "./pages/PaymentPlanPage";
import CreateDebt from "./pages/CreateDebtPage";
import MainLayout from "./pages/MainLayout";
import AuthLayout from "./pages/AuthLayout";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="create-debt" element={<CreateDebt />} />
          <Route path="/debt" element={<DebtsPage />} />
          <Route path="/payment-plan" element={<PaymentPlanPage />} />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>




      </Routes>
    </Router>
  );
}

export default App;