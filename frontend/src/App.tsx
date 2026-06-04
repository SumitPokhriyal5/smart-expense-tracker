import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Placeholder title="Login Page" />} />
        <Route
          path="/register"
          element={<Placeholder title="Register Page" />}
        />
        <Route path="/dashboard" element={<Placeholder title="Dashboard" />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
