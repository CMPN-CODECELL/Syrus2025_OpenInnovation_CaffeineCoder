import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Users, Briefcase, Star, Rocket, Award, ArrowRight, Code, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect to role-specific dashboard
      navigate(`/${user.role.toLowerCase()}/dashboard`);
    }
  }, [user, navigate]);

  if (user) {
    // While redirecting is happening, show a loading state or null
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Welcome to EduTrade</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your all-in-one platform for learning, mentorship, and career growth. Connect with experts, 
          share knowledge, and accelerate your professional journey.
        </p>
      </div>

      {/* Main Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-xl shadow-md transform hover:scale-105 transition-transform"
          onClick={() => navigate('/learner/dashboard')}>
          <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">For Learners</h2>
          <p className="text-gray-600 mb-4">
            Access quality education, connect with mentors, and find job opportunities.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
              Book 1-on-1 mentoring sessions
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
              Track your learning progress
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
              Get personalized job matches
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md transform hover:scale-105 transition-transform"
          onClick={() => navigate('/mentor/dashboard')}>
          <Users className="h-12 w-12 text-green-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">For Mentors</h2>
          <p className="text-gray-600 mb-4">
            Share your knowledge, guide learners, and build your professional network.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-green-600" />
              Create your teaching profile
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-green-600" />
              Earn points and certificates
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-green-600" />
              Flexible scheduling
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md transform hover:scale-105 transition-transform"
          onClick={() => navigate('/employer/dashboard')}>
          <Briefcase className="h-12 w-12 text-purple-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">For Employers</h2>
          <p className="text-gray-600 mb-4">
            Find talented candidates, post job opportunities, and grow your team.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-purple-600" />
              Access verified talent pool
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-purple-600" />
              Post job opportunities
            </li>
            <li className="flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-purple-600" />
              Track applicant progress
            </li>
          </ul>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
              <Code className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Skill Swap</h3>
            <p className="text-gray-600">
              Learn and teach skills, earning points for every hour of participation
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Mentorship</h3>
            <p className="text-gray-600">
              Connect with industry professionals for personalized guidance
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-full inline-block mb-4">
              <BadgeCheck className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Certifications</h3>
            <p className="text-gray-600">
              Earn recognized certificates through points and assessments
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 p-4 rounded-full inline-block mb-4">
              <Briefcase className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Job Board</h3>
            <p className="text-gray-600">
              Find opportunities matched to your skills and experience
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Start Your Learning Journey Today</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of learners and mentors already on the platform
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate('/register')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
          >
            Sign Up Now
          </button>
          <button 
            onClick={() => navigate('/about')}
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;