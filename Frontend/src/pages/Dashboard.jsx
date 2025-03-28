import { useAuth } from '../context/AuthContext';
import { BookOpen, Users, Briefcase } from 'lucide-react';

function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to LearnConnect</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">For Learners</h2>
            <p className="text-gray-600">Access quality education, connect with mentors, and find job opportunities.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="h-12 w-12 text-green-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">For Mentors</h2>
            <p className="text-gray-600">Share your knowledge, guide learners, and build your professional network.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Briefcase className="h-12 w-12 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">For Employers</h2>
            <p className="text-gray-600">Find talented candidates, post job opportunities, and grow your team.</p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to role-specific dashboard
  return null;
}

export default Dashboard;