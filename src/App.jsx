import { BrowserRouter, Routes, Route } from "react-router-dom"

// public
import HomePage from "./pages/home"
import DangKyPage from "./pages/register"

// admin
import LoginPage from "./pages/admin/login"
import AdminDashboard from "./pages/admin"
import AdminThongKe from "./pages/admin/thongKe"

// route guard
import PrivateRoute from "./routes/PrivateRoute"
import VisitManagePage from "./pages/admin/visitManager"
import PostManager from "./pages/admin/postManager"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<HomePage />} />
        <Route path="/dang-ky" element={<DangKyPage />} />

        {/* ===== ADMIN LOGIN (PUBLIC) ===== */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* ===== ADMIN (BẢO VỆ) ===== */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/thong-ke" element={<AdminThongKe />} />
          <Route path="/admin/visits" element={<VisitManagePage />} />
          <Route path="/admin/posts" element={<PostManager />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}
