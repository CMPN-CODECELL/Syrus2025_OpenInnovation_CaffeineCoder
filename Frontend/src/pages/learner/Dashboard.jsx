import { useAuth } from '../../context/AuthContext';
import { BookOpen, Users, Star, Briefcase, Rocket, Award } from 'lucide-react';
import { Calendar } from 'lucide-react';

function LearnerDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.email}</h1>
            <p className="text-gray-600">Continue your learning journey</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Find a Mentor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-semibold">Learning Progress</h3>
            <p className="text-2xl font-bold">75%</p>
            <p className="text-sm text-gray-600">React Advanced Course</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-semibold">Active Mentors</h3>
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-gray-600">Weekly sessions</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <Star className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-semibold">Skills Mastered</h3>
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-gray-600">Verified by mentors</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Current Learning Path</h2>
            <button className="text-blue-600 hover:underline flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              Update Goals
            </button>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-semibold">Frontend Development</h3>
              <p className="text-gray-600">React & TypeScript Mastery</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="border-l-4 border-gray-300 pl-4">
              <h3 className="font-semibold">Backend Development</h3>
              <p className="text-gray-600">Node.js & Express</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Upcoming Sessions</h2>
            <button className="text-blue-600 hover:underline flex items-center gap-2">
              <Award className="h-4 w-4" />
              Book Session
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">React Advanced Patterns</h3>
                <p className="text-sm text-gray-600">with John Doe • Today 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
              <div className="bg-purple-600 text-white p-2 rounded-lg">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Career Strategy Session</h3>
                <p className="text-sm text-gray-600">with Jane Smith • Tomorrow 11:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recommended Job Matches</h2>
          <button className="text-blue-600 hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Senior Frontend Developer</h3>
                <p className="text-gray-600">TechCorp Inc.</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                95% Match
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                React
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                TypeScript
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Next.js
              </span>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Full Stack Developer</h3>
                <p className="text-gray-600">InnovateLabs</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                88% Match
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Node.js
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                React
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                MongoDB
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnerDashboard;