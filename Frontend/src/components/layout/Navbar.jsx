import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Users, Briefcase } from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">EduTrade</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;