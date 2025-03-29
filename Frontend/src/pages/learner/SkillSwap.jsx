import React, { useState } from 'react';
import { Search, BookOpen, Users, Clock, Award, Play, CheckCircle, ArrowLeft, X, CheckSquare, Download, Gift, AlignCenterVertical as Certificate, MessageSquare, ThumbsUp, ThumbsDown, Send, Star } from 'lucide-react';

function VideoPage() {
  const [activeTab, setActiveTab] = useState('learn');
  const [showCourse, setShowCourse] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showSkillSwapForm, setShowSkillSwapForm] = useState(false);
const [skillSwapRequests, setSkillSwapRequests] = useState([]);
const handleSkillSwapSubmit = (formData) => {
  setSkillSwapRequests(prev => [
    ...prev,
    {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toLocaleString()
    }
  ]);
};
  
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

  const certificates = [
    {
      id: 1,
      title: "React & TypeScript",
      points: 50,
      available: true
    },
    {
      id: 2,
      title: "Node.js Fundamentals",
      points: 75,
      available: true
    }
  ];

  const [activeVideo, setActiveVideo] = useState(courseData.lectures[0]);
  const [userPoints, setUserPoints] = useState(150);

  // VideoFeedback Component with Average Review
  const VideoFeedback = ({ videoId, courseTitle }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
    
    // Mock comments data
    const [comments, setComments] = useState([
      {
        id: 1,
        user: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        comment: "This lecture really helped me understand React hooks. Great explanation!",
        rating: 5,
        timestamp: "2 days ago",
        likes: 12,
        dislikes: 0
      },
      {
        id: 2,
        user: "Michael Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        comment: "Good overview but I wish there were more practical examples.",
        rating: 4,
        timestamp: "1 week ago",
        likes: 5,
        dislikes: 1
      }
    ]);

    // Calculate average rating
    const calculateAverageRating = () => {
      if (comments.length === 0) return 0;
      const sum = comments.reduce((total, comment) => total + comment.rating, 0);
      return (sum / comments.length).toFixed(1);
    };
    
    const averageRating = calculateAverageRating();
    const totalReviews = comments.length;

    // Update isSubmitButtonDisabled based on rating and comment
    React.useEffect(() => {
      setIsSubmitButtonDisabled(rating === 0 || comment.trim() === '');
    }, [rating, comment]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (rating === 0 || comment.trim() === '') return;
      
      // Add new comment
      const newComment = {
        id: comments.length + 1,
        user: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
        comment: comment,
        rating: rating,
        timestamp: "Just now",
        likes: 0,
        dislikes: 0
      };
      
      setComments([newComment, ...comments]);
      setComment('');
      setRating(0);
      setSubmitted(true);
      // Automatically show comments after submitting
      setShowComments(true);
      setTimeout(() => setSubmitted(false), 3000);
    };

    const handleLike = (commentId) => {
      setComments(comments.map(c => 
        c.id === commentId ? {...c, likes: c.likes + 1} : c
      ));
    };

    const handleDislike = (commentId) => {
      setComments(comments.map(c => 
        c.id === commentId ? {...c, dislikes: c.dislikes + 1} : c
      ));
    };

    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 mt-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Video Feedback</h3>
          
          {/* Average Rating Component */}
          <div className="bg-blue-50 rounded-lg p-3 flex items-center">
            <div className="mr-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-blue-600 mr-1">{averageRating}</span>
                <span className="text-sm text-gray-600">/ 5</span>
              </div>
              <p className="text-xs text-gray-500">{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</p>
            </div>
          </div>
        </div>
        
        {/* Rating and comment form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rate this lecture
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`transition-all ${
                    rating >= star ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <Star className="h-8 w-8 fill-current" />
                </button>
              ))}
            </div>
            {rating === 0 && (
              <p className="text-xs text-red-500 mt-1">Please select a rating</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share your thoughts
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`w-full px-4 py-3 border ${comment.trim() === '' ? 'border-red-200' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="What did you think about this lecture?"
              rows={3}
            ></textarea>
            {comment.trim() === '' && (
              <p className="text-xs text-red-500 mt-1">Please enter your feedback</p>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitButtonDisabled}
              className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                isSubmitButtonDisabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Send className="h-5 w-5 mr-2" />
              Submit Feedback
            </button>
          </div>
          
          {submitted && (
            <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Thank you for your feedback!
            </div>
          )}
        </form>
        
        {/* Comments section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center text-gray-700 hover:text-blue-600 transition-all"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              <span className="font-medium">
                {showComments ? 'Hide Comments' : `Show Comments (${comments.length})`}
              </span>
            </button>
          </div>
          
          {showComments && (
            <div className="space-y-4">
              {comments.map((item) => (
                <div key={item.id} className="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-all">
                  <div className="flex items-start">
                    <img
                      src={item.avatar}
                      alt={item.user}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800">{item.user}</h4>
                        <span className="text-sm text-gray-500">{item.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <p className="text-gray-700 mb-3">{item.comment}</p>
                      
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(item.id)}
                          className="flex items-center text-gray-500 hover:text-blue-600 transition-all"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>{item.likes}</span>
                        </button>
                        <button
                          onClick={() => handleDislike(item.id)}
                          className="flex items-center text-gray-500 hover:text-red-600 transition-all"
                        >
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          <span>{item.dislikes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleRedeemCertificate = (certificate) => {
    if (userPoints >= certificate.points) {
      setUserPoints(prev => prev - certificate.points);
      // In a real app, you would generate and store the certificate here
      const certificateContent = `
        This is to certify that
        [User Name]
        has successfully completed
        ${certificate.title}
        
        Date: ${new Date().toLocaleDateString()}
      `;
      
      const blob = new Blob([certificateContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${certificate.title.toLowerCase().replace(/\s+/g, '-')}-certificate.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  const PointsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Redeem Points</h2>
          <button 
            onClick={() => setShowPointsModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-800">Available Points</h3>
                <p className="text-2xl font-bold text-blue-600">{userPoints}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {certificates.map((cert) => (
            <div 
              key={cert.id}
              className="border border-gray-200 rounded-lg p-6 flex items-center justify-between hover:border-blue-200 transition-all"
            >
              <div className="flex items-center">
                <Certificate className="h-8 w-8 text-green-600 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-800">{cert.title}</h4>
                  <p className="text-sm text-gray-600">{cert.points} points required</p>
                </div>
              </div>
              <button
                onClick={() => handleRedeemCertificate(cert)}
                disabled={userPoints < cert.points}
                className={`
                  flex items-center px-4 py-2 rounded-lg transition-all
                  ${userPoints >= cert.points
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                `}
              >
                <Download className="h-5 w-5 mr-2" />
                Redeem
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
                
                {/* Video Feedback Component */}
                <VideoFeedback 
                  videoId={activeVideo.id} 
                  courseTitle={courseData.title} 
                />
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
        {/* <button 
  onClick={() => setShowSkillSwapForm(true)}
  className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mx-auto"
>
  <BookOpen className="h-5 w-5" />
  Create Skill Swap Request
</button> */}
        {/* Points Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Clock, color: 'blue', title: 'Teaching Hours', value: '12' },
            { icon: BookOpen, color: 'green', title: 'Learning Hours', value: '8' },
            { 
              icon: Award, 
              color: 'purple', 
              title: 'Points Available', 
              value: userPoints,
              onClick: () => setShowPointsModal(true)
            },
            { icon: Users, color: 'orange', title: 'Active Sessions', value: '3' }
          ].map(({ icon: Icon, color, title, value, onClick }) => (
            <div 
              key={title} 
              className={`
                bg-white rounded-xl border border-gray-100 shadow-lg p-6 text-center 
                transition-all duration-300 hover:shadow-xl hover:scale-105
                ${onClick ? 'cursor-pointer' : ''}
              `}
              onClick={onClick}
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
        <div className="mt-8 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Skill Swap Requests</h2>
    
    {skillSwapRequests.length === 0 ? (
      <div className="text-center py-8 text-gray-500">
        No skill swap requests yet. Be the first to create one!
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillSwapRequests.map(request => (
          <div key={request.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{request.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{request.timestamp}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Book className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-gray-700">
                      <span className="font-medium">Teaching:</span> {request.skillTeaching}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-gray-700">
                      <span className="font-medium">Learning:</span> {request.skillLearning}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {request.experienceLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
{showSkillSwapForm && (
  <SkillSwapForm 
    onClose={() => setShowSkillSwapForm(false)}
    onSubmit={handleSkillSwapSubmit}
  />
)}
      </div>
      {showPointsModal && <PointsModal />}
    </div>
  );
}

export default VideoPage;