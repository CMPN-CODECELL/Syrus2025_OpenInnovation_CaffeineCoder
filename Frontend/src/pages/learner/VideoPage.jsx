import React, { useState } from 'react';
import { Search, BookOpen, Users, Clock, Award, Play, CheckCircle, ArrowLeft } from 'lucide-react';

function VideoPage() {
  const [activeTab, setActiveTab] = useState('learn');
  const [showCourse, setShowCourse] = useState(false);
  
  const courseData = {
    title: "React & TypeScript Masterclass",
    instructor: "John Doe",
    lectures: [
      {
        id: 1,
        title: "Introduction to React",
        duration: "15:30",
        videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8",
        completed: true
      },
      {
        id: 2,
        title: "TypeScript Basics",
        duration: "20:45",
        videoUrl: "https://www.youtube.com/embed/BCg4U1FzODs",
        completed: false
      },
      {
        id: 3,
        title: "Building Components",
        duration: "25:15",
        videoUrl: "https://www.youtube.com/embed/4UZrsTqkcW4",
        completed: false
      }
    ]
  };

  const [activeVideo, setActiveVideo] = useState(courseData.lectures[0]);

  if (showCourse) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button 
            onClick={() => setShowCourse(false)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={activeVideo.videoUrl}
                    className="w-full h-[400px]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{activeVideo.title}</h2>
                  <p className="text-gray-600">Instructor: {courseData.instructor}</p>
                </div>
              </div>
            </div>

            {/* Course Content Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Course Content</h3>
              <div className="space-y-4">
                {courseData.lectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    onClick={() => setActiveVideo(lecture)}
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                      activeVideo.id === lecture.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Play className="h-4 w-4 mr-3 text-gray-500" />
                      <div>
                        <h4 className="font-medium">{lecture.title}</h4>
                        <p className="text-sm text-gray-500">{lecture.duration}</p>
                      </div>
                    </div>
                    {lecture.completed && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                      <button 
                        className="mt-3 text-blue-600 hover:underline"
                        onClick={() => setShowCourse(true)}
                      >
                        View Course
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
                        View Course
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
                      rows={4}
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

export default VideoPage;