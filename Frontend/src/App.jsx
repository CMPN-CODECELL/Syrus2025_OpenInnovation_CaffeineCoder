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
import FindMentors from './pages/learner/FIndMentors';
import ResumeBuilder from './pages/learner/ResumeBuilder';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/learner/dashboard" element={<LearnerDashboard />} />
              <Route path='/mentor/dashboard' element={<MentorDashboard />} />
              <Route path="/employer/dashboard" element={<EmployerDashboard />} />
              <Route path='/skill-swap' element={<SkillSwap />} />
              <Route path='/find-mentor' element={<FindMentors />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />

            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;