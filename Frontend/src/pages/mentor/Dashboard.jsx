import { useAuth } from '../../context/AuthContext';
import { Users, Calendar, MessageSquare, Award, BookOpen, Star, ChevronRight } from 'lucide-react';

function MentorDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.email}</h1>
            <p className="text-gray-600">You have 3 pending mentorship requests</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            View Requests
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <Users className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-semibold">Active Mentees</h3>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-gray-600">+2 this month</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <Calendar className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-semibold">Sessions This Week</h3>
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-gray-600">2 hours today</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <MessageSquare className="h-8 w-8 text-yellow-600 mb-2" />
            <h3 className="font-semibold">Open Requests</h3>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-gray-600">Pending review</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <Award className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-semibold">Skills Validated</h3>
            <p className="text-2xl font-bold">28</p>
            <p className="text-sm text-gray-600">This month</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Today's Sessions</h2>
            <button className="text-blue-600 hover:underline flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">React Advanced Concepts</h3>
                <p className="text-gray-600">with Sarah Johnson</p>
                <p className="text-sm text-gray-500">3:00 PM - 4:00 PM</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Join
              </button>
            </div>
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="bg-purple-600 text-white p-2 rounded-lg">
                <Star className="h-6 w-6" />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">Career Guidance Session</h3>
                <p className="text-gray-600">with Michael Chen</p>
                <p className="text-sm text-gray-500">5:00 PM - 6:00 PM</p>
              </div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Skill Validation Requests</h2>
            <button className="text-blue-600 hover:underline flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">JavaScript - Advanced</p>
                  <p className="text-sm text-gray-500">Requested by Alex Smith</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                    Approve
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Decline
                  </button>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  ES6+
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Async/Await
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Design Patterns
                </span>
              </div>
            </div>
            <div className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">React.js - Intermediate</p>
                  <p className="text-sm text-gray-500">Requested by Emma Davis</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                    Approve
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Decline
                  </button>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Hooks
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Context
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Redux
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorDashboard;