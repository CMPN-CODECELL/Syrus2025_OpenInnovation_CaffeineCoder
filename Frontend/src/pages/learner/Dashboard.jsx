import { useAuth } from '../../context/AuthContext';
import { 
  BookOpen, Users, Star, Briefcase, Rocket, Award, Search, FileText,
  Calendar, Bell, TrendingUp, Brain, Target, Book, MessageSquare, 
  Clock, CheckCircle, Coffee, ChevronRight, Plus, MoreHorizontal,
  Video, Bookmark, BarChart2, HelpCircle, Mic, Code, Shield, 
  Clipboard, ListChecks, BadgeDollarSign, Handshake
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LearnerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Tab-specific content rendering
  const renderTabContent = () => {
    switch (activeTab) {
      case 'learning':
        return <MyLearningPage user={user} />;
      case 'mentorship':
        return <MentorshipPage user={user} />;
      default:
        return <OverviewPage user={user} />;
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Top Navigation Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'learning' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('learning')}
            >
              My Learning
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'mentorship' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('mentorship')}
            >
              Mentorship
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <img 
                src={`https://ui-avatars.com/api/?name=${user?.email}&background=random`}
                alt="Profile"
                className="h-9 w-9 rounded-full border-2 border-indigo-100"
              />
              <span className="text-gray-700 font-medium">{user?.email.split('@')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
}

// Overview Page Component
function OverviewPage({ user }) {
  const navigate = useNavigate();
  const [notifications] = useState([
    { id: 1, text: "New course recommendation based on your progress", type: "course" },
    { id: 2, text: "Upcoming mentor session in 2 hours", type: "mentor" },
    { id: 3, text: "You've earned a new skill badge!", type: "achievement" }
  ]);

  return (
    <>
   <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-8 rounded-xl shadow-lg text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.email.split('@')[0]}!</h1>
          <p className="text-gray-200 mt-2">Your learning journey continues here</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <button 
            onClick={() => navigate('/resume-builder')}
            className="bg-white text-indigo-700 px-5 py-2.5 rounded-lg hover:bg-indigo-200 flex items-center gap-2 font-medium transition-all shadow-sm whitespace-nowrap"
          >
            <FileText className="h-4 w-4" />
            Build Resume
          </button>
          <button 
            onClick={() => navigate('/skill-swap')}
            className="bg-indigo-500 border border-indigo-300 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-medium transition-all shadow-sm whitespace-nowrap"
          >
            <Brain className="h-4 w-4" />
            Skill Swap
          </button>
          <button 
            onClick={() => navigate('/find-mentor')}
            className="bg-indigo-500 border border-indigo-300 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-medium transition-all shadow-sm whitespace-nowrap"
          >
            <Users className="h-4 w-4" />
            Find Mentor
          </button>
        </div>
      </div>

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Progress - Takes 2 cols on large screens */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">Current Learning Path</h2>
              <button className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1">
                <Rocket className="h-4 w-4" />
                Update Goals
              </button>
            </div>
            
            <div className="space-y-5">
              {/* React Course Progress */}
              <div className="border-l-4 border-indigo-500 pl-4 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">Advanced React Patterns</h3>
                    <p className="text-sm text-gray-500">Master component composition</p>
                  </div>
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
                    75% Complete
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: '75%' }}
                  ></div>
                </div>
                <div className="mt-3 flex gap-1.5">
                  <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-0.5 rounded">
                    4/6 Modules
                  </span>
                  <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded">
                    12 Practice Exercises
                  </span>
                </div>
              </div>

              {/* Node.js Course Progress */}
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">Node.js Microservices</h3>
                    <p className="text-sm text-gray-500">Build scalable applications</p>
                  </div>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
                    30% Complete
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: '30%' }}
                  ></div>
                </div>
                <div className="mt-3 flex gap-1.5">
                  <span className="bg-purple-50 text-purple-700 text-xs px-2 py-0.5 rounded">
                    2/8 Modules
                  </span>
                  <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded">
                    5 Practice Exercises
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 p-2.5 rounded-lg transition-colors border border-gray-200">
                <Book className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Resume Course</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 p-2.5 rounded-lg transition-colors border border-gray-200">
                <MessageSquare className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Join Discussion</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 p-2.5 rounded-lg transition-colors border border-gray-200">
                <Coffee className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Take a Break</span>
              </button>
            </div>
          </div>

          {/* Job Recommendations */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">Recommended Job Matches</h2>
              <button className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-xl p-5 hover:shadow-md transition-all border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">Senior Frontend Developer</h3>
                    <p className="text-sm text-gray-500">TechCorp Inc. • Remote</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    95% Match
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-gray-600 text-sm mb-3">
                    Perfect match for your React and TypeScript expertise
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                      React
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                      TypeScript
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                      Next.js
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-gray-500 text-xs">Posted 2 days ago</span>
                  <button className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 text-sm font-medium">
                    Apply Now
                  </button>
                </div>
              </div>

              <div className="border rounded-xl p-5 hover:shadow-md transition-all border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">Full Stack Developer</h3>
                    <p className="text-sm text-gray-500">InnovateLabs • Hybrid</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    88% Match
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-gray-600 text-sm mb-3">
                    Great opportunity to use your full stack skills
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                      Node.js
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                      React
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                      MongoDB
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-gray-500 text-xs">Posted 3 days ago</span>
                  <button className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 text-sm font-medium">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Sessions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Today's Schedule</h2>
              <button className="text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                View Calendar
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="bg-indigo-600 text-white p-1.5 rounded-lg mt-1">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">React Advanced Patterns</h3>
                  <p className="text-xs text-gray-600">with John Doe • 2:00 PM</p>
                  <div className="mt-2 flex gap-1.5">
                    <button className="text-xs bg-indigo-600 text-white px-2 py-1 rounded font-medium">
                      Join Now
                    </button>
                    <button className="text-xs text-indigo-600 hover:underline">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                <div className="bg-purple-600 text-white p-1.5 rounded-lg mt-1">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Career Strategy Session</h3>
                  <p className="text-xs text-gray-600">with Jane Smith • 4:00 PM</p>
                  <div className="mt-2 flex gap-1.5">
                    <button className="text-xs bg-purple-600 text-white px-2 py-1 rounded font-medium">
                      Prepare
                    </button>
                    <button className="text-xs text-purple-600 hover:underline">
                      Add Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
              <button className="text-indigo-600 hover:bg-indigo-50 p-1 rounded-lg">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <div className={`p-1.5 rounded-lg mt-0.5 ${
                    notification.type === 'course' ? 'bg-blue-100 text-blue-600' :
                    notification.type === 'mentor' ? 'bg-purple-100 text-purple-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {notification.type === 'course' && <Book className="h-3.5 w-3.5" />}
                    {notification.type === 'mentor' && <Users className="h-3.5 w-3.5" />}
                    {notification.type === 'achievement' && <Award className="h-3.5 w-3.5" />}
                  </div>
                  <p className="text-sm text-gray-700 flex-1">{notification.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// My Learning Page Component
function MyLearningPage({ user }) {
  const [activeLearningTab, setActiveLearningTab] = useState('in-progress');
  const [courses] = useState([
    {
      id: 1,
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      progress: 75,
      category: "Frontend Development",
      lastAccessed: "2 hours ago",
      modules: 6,
      completedModules: 4,
      thumbnail: '/react.jpg'
      
    },
    {
      id: 2,
      title: "Node.js Microservices",
      instructor: "Michael Chen",
      progress: 30,
      category: "Backend Development",
      lastAccessed: "1 day ago",
      modules: 8,
      completedModules: 2,
      thumbnail: "/node.jpg"
    },
    {
      id: 3,
      title: "UX Design Fundamentals",
      instructor: "Emma Rodriguez",
      progress: 10,
      category: "Design",
      lastAccessed: "3 days ago",
      modules: 5,
      completedModules: 0,
      thumbnail: "uiux.jpg"
    }
  ]);

  const [completedCourses] = useState([
    {
      id: 4,
      title: "JavaScript Essentials",
      instructor: "David Wilson",
      completedDate: "May 15, 2023",
      category: "Programming",
      certificate: true,
      thumbnail: "/javascript.jpg"
    },
    {
      id: 5,
      title: "CSS Masterclass",
      instructor: "Lisa Thompson",
      completedDate: "March 28, 2023",
      category: "Frontend Development",
      certificate: true,
      thumbnail: "/css.jpg"
    }
  ]);

  const [bookmarks] = useState([
    {
      id: 6,
      title: "TypeScript Deep Dive",
      instructor: "Robert Johnson",
      category: "Programming",
      savedDate: "1 week ago",
      thumbnail: "/typescript.jpg"
    },
    {
      id: 7,
      title: "GraphQL API Design",
      instructor: "Jennifer Lee",
      category: "Backend Development",
      savedDate: "2 weeks ago",
      thumbnail: "/graphql.jpg"
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Learning Page Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Learning</h1>
            <p className="text-gray-600">Track your progress and continue your courses</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 text-sm font-medium">
              <Plus className="h-4 w-4" />
              Add New Course
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium">
              <Search className="h-4 w-4" />
              Browse Courses
            </button>
          </div>
        </div>

        {/* Learning Tabs */}
        <div className="flex border-b border-gray-200 mt-6">
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeLearningTab === 'in-progress'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveLearningTab('in-progress')}
          >
            In Progress
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeLearningTab === 'completed'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveLearningTab('completed')}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeLearningTab === 'bookmarks'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveLearningTab('bookmarks')}
          >
            Bookmarks
          </button>
        </div>
      </div>

      {/* Course Content */}
      {activeLearningTab === 'in-progress' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-semibold">{course.title}</h3>
                    <p className="text-white/80 text-sm">{course.instructor}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">
                      {course.category}
                    </span>
                    <span className="text-xs text-gray-500">Last accessed: {course.lastAccessed}</span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress: {course.progress}%</span>
                      <span>{course.completedModules}/{course.modules} modules</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                      Continue
                    </button>
                    <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                      <MoreHorizontal className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Learning Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="text-xs text-indigo-800">Active Courses</p>
                    <p className="text-xl font-bold text-gray-800">3</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-purple-800">Weekly Hours</p>
                    <p className="text-xl font-bold text-gray-800">8.5h</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-xs text-green-800">Completed</p>
                    <p className="text-xl font-bold text-gray-800">12</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-xs text-yellow-800">Current Streak</p>
                    <p className="text-xl font-bold text-gray-800">7 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeLearningTab === 'completed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedCourses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  Completed
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-800 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="text-xs text-gray-500">Completed: {course.completedDate}</span>
                </div>
                
                <div className="flex gap-2">
                  {course.certificate && (
                    <button className="flex-1 bg-white border border-indigo-600 text-indigo-600 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1">
                      <FileText className="h-4 w-4" />
                      View Certificate
                    </button>
                  )}
                  <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeLearningTab === 'bookmarks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Bookmark className="h-3 w-3" />
                  Saved
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-800 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="text-xs text-gray-500">Saved: {course.savedDate}</span>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Start Learning
                  </button>
                  <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Mentorship Page Component
function MentorshipPage({ user }) {
  const [activeMentorshipTab, setActiveMentorshipTab] = useState('upcoming');
  const [upcomingSessions] = useState([
    {
      id: 1,
      title: "React Performance Optimization",
      mentor: "Alex Johnson",
      date: "Tomorrow, 3:00 PM",
      duration: "45 mins",
      meetingLink: "https://meet.example.com/abc123",
      preparation: "Review performance bottlenecks in your project"
    },
    {
      id: 2,
      title: "Career Growth Strategy",
      mentor: "Maria Garcia",
      date: "Friday, 11:00 AM",
      duration: "1 hour",
      meetingLink: "https://meet.example.com/def456",
      preparation: "Prepare your career goals and questions"
    }
  ]);

  const [pastSessions] = useState([
    {
      id: 3,
      title: "Technical Interview Prep",
      mentor: "David Kim",
      date: "May 20, 2023",
      duration: "1 hour",
      rating: 5,
      notes: "Great tips on system design questions",
      recording: "https://recording.example.com/xyz789"
    },
    {
      id: 4,
      title: "Node.js Best Practices",
      mentor: "Sarah Wilson",
      date: "April 15, 2023",
      duration: "45 mins",
      rating: 4,
      notes: "Learned about error handling patterns",
      recording: "https://recording.example.com/uvw456"
    }
  ]);

  const [mentors] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      title: "Senior Frontend Engineer at TechCorp",
      expertise: ["React", "Performance", "TypeScript"],
      sessionsCompleted: 24,
      rating: 4.9,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      available: true
    },
    {
      id: 2,
      name: "Maria Garcia",
      title: "Engineering Manager at InnovateCo",
      expertise: ["Career Growth", "Leadership"],
      sessionsCompleted: 42,
      rating: 4.8,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      available: true
    },
    {
      id: 3,
      name: "David Kim",
      title: "Principal Engineer at DevSolutions",
      expertise: ["System Design", "Interview Prep", "Scalability"],
      sessionsCompleted: 36,
      rating: 4.7,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      available: false
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Mentorship Page Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mentorship</h1>
            <p className="text-gray-600">Connect with experienced mentors to accelerate your growth</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 text-sm font-medium">
              <Plus className="h-4 w-4" />
              New Session
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium">
              <Search className="h-4 w-4" />
              Find Mentors
            </button>
          </div>
        </div>

        {/* Mentorship Tabs */}
        <div className="flex border-b border-gray-200 mt-6">
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeMentorshipTab === 'upcoming'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveMentorshipTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeMentorshipTab === 'past'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveMentorshipTab('past')}
          >
            Past Sessions
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeMentorshipTab === 'mentors'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveMentorshipTab('mentors')}
          >
            My Mentors
          </button>
        </div>
      </div>

      {/* Mentorship Content */}
      {activeMentorshipTab === 'upcoming' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingSessions.map(session => (
              <div key={session.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">{session.title}</h3>
                    <p className="text-sm text-gray-600">with {session.mentor}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {session.date}
                  </span>
                </div>
                
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{session.duration} session</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clipboard className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Preparation: {session.preparation}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    View Meeting Link
                  </button>
                  <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Mentorship Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-indigo-600" />
                  <div>
                    <h3 className="font-medium text-gray-800">How to Prepare</h3>
                    <p className="text-xs text-gray-600">5 min read</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <ListChecks className="h-5 w-5 text-purple-600" />
                  <div>
                    <h3 className="font-medium text-gray-800">Session Templates</h3>
                    <p className="text-xs text-gray-600">Pre-made agendas</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="font-medium text-gray-800">FAQ</h3>
                    <p className="text-xs text-gray-600">Common questions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeMentorshipTab === 'past' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastSessions.map(session => (
              <div key={session.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">{session.title}</h3>
                    <p className="text-sm text-gray-600">with {session.mentor}</p>
                  </div>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {session.date}
                  </span>
                </div>
                
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{session.duration} session</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-700">
                      Rating: {session.rating}/5
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span className="text-sm text-gray-700">Notes: {session.notes}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-white border border-indigo-600 text-indigo-600 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors">
                    View Recording
                  </button>
                  <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Book Again
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Session History</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-800">Total Sessions Completed</h3>
                <p className="text-2xl font-bold text-indigo-600">14</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Average Rating</h3>
                <p className="text-2xl font-bold text-indigo-600">4.7/5</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Hours Learned</h3>
                <p className="text-2xl font-bold text-indigo-600">10.5h</p>
              </div>
            </div>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
              <BarChart2 className="h-8 w-8 text-gray-400" />
              <span className="text-gray-500 ml-2">Session history chart</span>
            </div>
          </div>
        </div>
      )}

      {activeMentorshipTab === 'mentors' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map(mentor => (
              <div key={mentor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={mentor.avatar} 
                    alt={mentor.name}
                    className="h-12 w-12 rounded-full border-2 border-indigo-100"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{mentor.name}</h3>
                    <p className="text-xs text-gray-600">{mentor.title}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-700">
                      {mentor.rating} ({mentor.sessionsCompleted} sessions)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.expertise.map((skill, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      mentor.available
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!mentor.available}
                  >
                    {mentor.available ? 'Book Session' : 'Not Available'}
                  </button>
                  <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Find New Mentors</h2>
              <button className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg text-sm font-medium">
                Browse All Mentors
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Code className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-medium text-gray-800">Technical Skills</h3>
                </div>
                <p className="text-xs text-gray-600">Improve your coding abilities</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                  <h3 className="font-medium text-gray-800">Career Growth</h3>
                </div>
                <p className="text-xs text-gray-600">Advance your career</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Mic className="h-5 w-5 text-green-600" />
                  <h3 className="font-medium text-gray-800">Interview Prep</h3>
                </div>
                <p className="text-xs text-gray-600">Ace your next interview</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-yellow-600" />
                  <h3 className="font-medium text-gray-800">Leadership</h3>
                </div>
                <p className="text-xs text-gray-600">Develop leadership skills</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LearnerDashboard;