// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LearnerDashboard from './pages/learner/Dashboard';
import EmployerDashboard from './pages/employer/Dashboard';
import { AuthProvider } from './context/AuthContext';
import MentorDashboard from './pages/mentor/Dashboard';
import SkillSwap from './pages/learner/SkillSwap';
import ResumeBuilder from './pages/learner/ResumeBuilder';
import VideoPage from './pages/learner/VideoPage';
import Profile from './pages/auth/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import AuthRedirect from './components/AuthRedirect';
import FindMentors from './pages/learner/FindMentors';
import PostJob from './pages/employer/PostJob';
import SkillSwapForm from './pages/learner/SkillSwapForm';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* Public routes - redirect if logged in */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={
                <>
                  <AuthRedirect />
                  <Login />
                </>
              } />
              <Route path="/register" element={
                <>
                  <AuthRedirect />
                  <Register />
                </>
              } />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute allowedRoles={['Learner', 'Mentor', 'Employer']} />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Learner-only routes */}
              <Route element={<ProtectedRoute allowedRoles={['Learner']} />}>
                <Route path="/learner/dashboard" element={<LearnerDashboard />} />
                <Route path="/skill-swap" element={<SkillSwap />} />
                <Route path="/find-mentor" element={<FindMentors />} />
                <Route path="/resume-builder" element={<ResumeBuilder />} />
                <Route path="/video-page" element={<VideoPage />} />
                <Route path='/skill-swap' element ={<SkillSwapForm />} />
              </Route>

              {/* Mentor-only routes */}
              <Route element={<ProtectedRoute allowedRoles={['Mentor']} />}>
                <Route path="/mentor/dashboard" element={<MentorDashboard />} />
              </Route>

              {/* Employer-only routes */}
              <Route element={<ProtectedRoute allowedRoles={['Employer']} />}>
                <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                <Route path='/post-job' element ={<PostJob/>} />
              </Route>
              
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;