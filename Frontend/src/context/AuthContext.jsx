import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Fetch user data if not in localStorage
        fetchUserData();
      }
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/user/profile');
    const userWithId = {
      ...response.data,
      id: response.data._id || response.data.id
    };
    setUser(userWithId);
    localStorage.setItem('user', JSON.stringify(userWithId));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      logout();
    }
  };

  const login = async (userData, authToken) => {
    const userWithId = {
      ...userData,
      id: userData._id || userData.id // Handle both MongoDB _id and regular id
    };
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
    setUser(userWithId);
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    navigate(`/${userData.role.toLowerCase()}/dashboard`);
  };

  const logout = async () => {
    try {
      // Attempt server-side logout
      await axios.post('/user/logout');
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with client-side cleanup even if API fails
    } finally {
      // Client-side cleanup
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
      navigate('/login');
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);