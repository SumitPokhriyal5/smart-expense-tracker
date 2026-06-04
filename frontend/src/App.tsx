import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-card rounded-2xl px-10 py-8 text-center">
        <h1 className="text-2xl font-semibold text-brand-600">{title}</h1>
        <p className="text-slate-500 mt-2">Smart Expense Tracker</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={<Placeholder title="Dashboard" />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
