import React, { useState } from 'react';
import { Search, BookOpen, Users, Clock, Award } from 'lucide-react';

function SkillSwap() {
  const [activeTab, setActiveTab] = useState('learn');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Skill Swap</h1>
        <p className="text-gray-600">Learn, teach, and earn points for certificates</p>
      </div>

      {/* Points Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Clock className="h-6 w-6 text-blue-600 mb-2" />
          <h3 className="font-semibold">Teaching Hours</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <BookOpen className="h-6 w-6 text-green-600 mb-2" />
          <h3 className="font-semibold">Learning Hours</h3>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Award className="h-6 w-6 text-purple-600 mb-2" />
          <h3 className="font-semibold">Points Earned</h3>
          <p className="text-2xl font-bold">150</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Users className="h-6 w-6 text-orange-600 mb-2" />
          <h3 className="font-semibold">Active Sessions</h3>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-6 py-3 ${
                activeTab === 'learn'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('learn')}
            >
              Learn Skills
            </button>
            <button
              className={`px-6 py-3 ${
                activeTab === 'teach'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('teach')}
            >
              Teach Skills
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'learn' ? (
            <div>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search for skills to learn..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Available Teachers */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                      alt="John Doe"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">John Doe</h3>
                      <p className="text-gray-600">React & TypeScript Expert</p>
                      <div className="mt-2 flex gap-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          React
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          TypeScript
                        </span>
                      </div>
                      <button className="mt-3 text-blue-600 hover:underline">
                        Book Session
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
                      alt="Jane Smith"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">Jane Smith</h3>
                      <p className="text-gray-600">Node.js Developer</p>
                      <div className="mt-2 flex gap-2">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Node.js
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Express
                        </span>
                      </div>
                      <button className="mt-3 text-blue-600 hover:underline">
                        Book Session
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Your Teaching Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skills You Can Teach
                    </label>
                    <input
                      type="text"
                      placeholder="Add skills (e.g., React, Node.js)"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Experience
                    </label>
                    <textarea
                      placeholder="Describe your experience..."
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                    ></textarea>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Update Teaching Profile
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Teaching Requests</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">React Basics</h4>
                        <p className="text-gray-600">Requested by Alex Johnson</p>
                        <p className="text-sm text-gray-500">1 hour session</p>
                      </div>
                      <div className="space-x-2">
                        <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                          Accept
                        </button>
                        <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300">
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillSwap;