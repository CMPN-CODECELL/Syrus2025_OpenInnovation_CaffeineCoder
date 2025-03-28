import React, { useState } from 'react';
import { 
  Search, BookOpen, Users, Clock, Award, Play, 
  CheckCircle, ArrowLeft, X, CheckSquare 
} from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-[90rem] mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden w-full">
        <div className="p-8">
          <button 
            onClick={() => setShowCourse(false)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
    
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Video Player Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={activeVideo.videoUrl}
                    className="w-full h-[500px]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6 bg-gray-50">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">{activeVideo.title}</h2>
                  <p className="text-gray-600">Instructor: {courseData.instructor}</p>
                </div>
              </div>
            </div>
    
            {/* Course Content Section */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 w-full h-auto">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Live Streamlit App</h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src="http://localhost:8501" 
                    className="w-full h-[400px] rounded-lg border" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
    
              <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 w-full">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Course Content</h3>
                <div className="space-y-3">
                  {courseData.lectures.map((lecture) => (
                    <div
                      key={lecture.id}
                      onClick={() => setActiveVideo(lecture)}
                      className={`
                        flex items-center justify-between p-4 rounded-lg 
                        cursor-pointer transition-all duration-300 
                        ${
                          activeVideo.id === lecture.id
                            ? 'bg-blue-50 border border-blue-200 transform scale-105'
                            : 'hover:bg-gray-50 hover:shadow-sm'
                        }
                      `}
                    >
                      <div className="flex items-center">
                        <Play className="h-5 w-5 mr-4 text-blue-500" />
                        <div>
                          <h4 className="font-medium text-gray-800">{lecture.title}</h4>
                          <p className="text-sm text-gray-500">{lecture.duration}</p>
                        </div>
                      </div>
                      {lecture.completed && (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">Skill Swap</h1>
          <p className="text-gray-600 text-lg">Learn, teach, and earn points for certificates</p>
        </div>

        {/* Points Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Clock, color: 'blue', title: 'Teaching Hours', value: '12' },
            { icon: BookOpen, color: 'green', title: 'Learning Hours', value: '8' },
            { icon: Award, color: 'purple', title: 'Points Earned', value: '150' },
            { icon: Users, color: 'orange', title: 'Active Sessions', value: '3' }
          ].map(({ icon: Icon, color, title, value }) => (
            <div 
              key={title} 
              className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <Icon className={`h-8 w-8 text-${color}-600 mx-auto mb-3`} />
              <h3 className="font-semibold text-gray-700 mb-1">{title}</h3>
              <p className="text-3xl font-bold text-gray-800">{value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Section */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            {['learn', 'teach'].map((tab) => (
              <button
                key={tab}
                className={`
                  flex-1 py-4 text-lg font-semibold transition-all duration-300
                  ${
                    activeTab === tab
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'learn' ? 'Learn Skills' : 'Teach Skills'}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'learn' ? (
              <div>
                <div className="mb-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search for skills to learn..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { 
                      name: 'John Doe', 
                      expertise: 'React & TypeScript Expert', 
                      skills: ['React', 'TypeScript'],
                      seed: 'John',
                      skillColor: 'blue'
                    },
                    { 
                      name: 'Jane Smith', 
                      expertise: 'Node.js Developer', 
                      skills: ['Node.js', 'Express'],
                      seed: 'Jane',
                      skillColor: 'green'
                    }
                  ].map((teacher) => (
                    <div 
                      key={teacher.name} 
                      className="border border-gray-100 rounded-xl p-6 flex items-center space-x-6 transition-all duration-300 hover:shadow-lg hover:border-blue-100"
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${teacher.seed}`}
                        alt={teacher.name}
                        className="w-16 h-16 rounded-full border-2 border-gray-200"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{teacher.name}</h3>
                        <p className="text-gray-600 mb-2">{teacher.expertise}</p>
                        <div className="flex gap-2">
                          {teacher.skills.map((skill) => (
                            <span 
                              key={skill} 
                              className={`bg-${teacher.skillColor}-50 text-${teacher.skillColor}-800 text-xs font-medium px-2.5 py-0.5 rounded`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <button 
                          className="mt-3 text-blue-600 hover:underline font-medium"
                          onClick={() => setShowCourse(true)}
                        >
                          View Course
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Your Teaching Profile</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skills You Can Teach
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Add skills (e.g., React, Node.js)"
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                          <CheckSquare className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Experience
                      </label>
                      <textarea
                        placeholder="Describe your experience..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                      ></textarea>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all">
                      Update Teaching Profile
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Teaching Requests</h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-6 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-1">React Basics</h4>
                        <p className="text-gray-600 mb-1">Requested by Alex Johnson</p>
                        <p className="text-sm text-gray-500">1 hour session</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2" /> Accept
                        </button>
                        <button className="bg-red-50 text-red-600 px-4 py-2 rounded hover:bg-red-100 transition-colors flex items-center">
                          <X className="h-5 w-5 mr-2" /> Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;