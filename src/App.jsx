import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignInPage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/Layout/AppLayout";
import { AuthProvider } from "./context/AuthenticationContext";
import ProtectedRoute from "./hook/ProtectedRoute";
import ComplaintPage from "./pages/ComplaintPage";
import FeedbackPage from "./pages/FeedbackPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import RecentCommentList from "./utils/Dashboard/RecentList/RecentCommentList";
import EditorPage from "./pages/EditorPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />

          {/* Protected Route */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/complaints" element={<ComplaintPage />} />
              <Route path="/feedbacks" element={<FeedbackPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/all-comments" element={<RecentCommentList />} />
              <Route path="/editor" element={<EditorPage />} />
              {/* Default route */}
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
