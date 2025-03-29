import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
<<<<<<< HEAD
import { BookOpen, User, Settings, LogOut, Star, Coins, Bell, HelpCircle } from 'lucide-react';
import axios from '../../api/axiosConfig';

function Navbar() {
  const { user, logout, token, updateUser } = useAuth(); // Added updateUser from AuthContext
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState('/profile_default.png');
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  // Fetch user data with proper error handling and refresh
  const fetchUserData = async () => {
    try {
      if (user?._id && token) {
        const response = await axios.get('/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Update both local state and auth context
        if (response.data) {
          setProfilePicture(response.data.profilePicture || '/profile_default.png');
          updateUser(response.data); // Update global user state
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchUserData();

    // Set up refresh interval (30 seconds)
    const intervalId = setInterval(fetchUserData, 30000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [user?._id, token]); // Add updateUser to dependencies if needed

  const handleDashboardClick = () => {
    navigate(user ? `/${user.role.toLowerCase()}/dashboard` : '/login');
=======
import { BookOpen, User, Settings, LogOut } from 'lucide-react';
import axios from '../../api/axiosConfig';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState('/profile_default.png');

  useEffect(() => {
    if (user?.profilePicture) {
      setProfilePicture(user.profilePicture);
    }
  }, [user]);

  const handleDashboardClick = () => {
    if (user) {
      navigate(`/${user.role.toLowerCase()}/dashboard`);
    } else {
      navigate('/login');
    }
>>>>>>> Mentor
  };

  const handleLogout = async () => {
    try {
      await axios.post('/user/logout');
<<<<<<< HEAD
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
=======
      logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
      // Fallback to client-side logout if API fails
>>>>>>> Mentor
      logout();
      setIsDropdownOpen(false);
    }
  };

<<<<<<< HEAD
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Display loading state if needed
  if (isLoading && user) {
    return (
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">Loading...</div>
      </nav>
    );
  }
=======
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
>>>>>>> Mentor

  return (
    <nav className="bg-white shadow-lg relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">EduTrade</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Get Started
                </Link>
              </>
            ) : (
<<<<<<< HEAD
              <>
                <Link to="/help" className="text-gray-600 hover:text-blue-600">
                  <HelpCircle className="h-5 w-5" />
                </Link>
                
                <div className="relative">
                  <Link to="/notifications" className="text-gray-600 hover:text-blue-600 relative">
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </Link>
                </div>
                
                {user?.role === 'Learner' && (
                  <>
                    <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{user.points || 0} Points</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-purple-50 px-3 py-1 rounded-full">
                      <Coins className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">{user.tokens || 10} Tokens</span>
                    </div>
                  </>
                )}

                <div className="relative">
                  <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
                    <img 
                      src={profilePicture} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                      onError={() => setProfilePicture('/profile_default.png')}
                    />
                    <span className="text-gray-700 font-medium hidden lg:inline">{user?.name}</span>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        {user?.role === 'Learner' && (
                          <div className="flex justify-between mt-1 text-xs">
                            <span className="text-yellow-600">{user.points || 0} Points</span>
                            <span className="text-purple-600">{user.tokens || 10} Tokens</span>
                          </div>
                        )}
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center border-t border-gray-100 mt-1"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center">
            {user ? (
              <div className="flex items-center space-x-3">
                {user?.role === 'Learner' && (
                  <>
                    <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs">{user.points || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-purple-50 px-2 py-1 rounded-full">
                      <Coins className="h-3 w-3 text-purple-500" />
                      <span className="text-xs">{user.tokens || 10}</span>
                    </div>
                  </>
                )}
                <button onClick={toggleDropdown}>
                  <img 
                    src={profilePicture} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    onError={() => setProfilePicture('/profile_default.png')}
                  />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
            )}
          </div>
        </div>

        {/* Mobile dropdown */}
        {isDropdownOpen && (
          <div className="md:hidden absolute top-16 right-0 left-0 bg-white shadow-md py-2 z-10 border-t border-gray-100">
            {user ? (
              <>
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  {user?.role === 'Learner' && (
                    <div className="flex justify-between mt-1 text-xs">
                      <span className="text-yellow-600">{user.points || 0} Points</span>
                      <span className="text-purple-600">{user.tokens || 10} Tokens</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleDashboardClick}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50"
                >
                  Dashboard
                </button>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/help"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Help Center
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 border-t border-gray-100"
=======
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleDashboardClick}
                  className="text-gray-600 hover:text-blue-600"
>>>>>>> Mentor
                >
                  Dashboard
                </button>
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <button 
                    onClick={toggleDropdown}
                    className="flex items-center space-x-1 focus:outline-none"
                  >
                    <img 
                      src={profilePicture} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover"
                      onError={() => setProfilePicture('/default-profile.png')}
                    />
                    <span className="text-gray-600">{user?.name}</span>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user ? (
              <button onClick={toggleDropdown} className="text-gray-600">
                <img 
                  src={profilePicture} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover"
                  onError={() => setProfilePicture('/default-profile.png')}
                />
              </button>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
            )}
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isDropdownOpen && (
          <div className="md:hidden absolute top-16 right-0 left-0 bg-white shadow-md py-2 z-10">
            {user ? (
              <>
                <button
                  onClick={handleDashboardClick}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Dashboard
                </button>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
<<<<<<< HEAD
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
=======
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
>>>>>>> Mentor
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
<<<<<<< HEAD
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
=======
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
>>>>>>> Mentor
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;