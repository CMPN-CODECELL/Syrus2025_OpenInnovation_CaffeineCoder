import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
  };

  const handleLogout = async () => {
    try {
      await axios.post('/user/logout');
      logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
      // Fallback to client-side logout if API fails
      logout();
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleDashboardClick}
                  className="text-gray-600 hover:text-blue-600"
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
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
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