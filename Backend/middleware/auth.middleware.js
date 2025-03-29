import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Custom error classes for better error handling
class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

// Enhanced auth middleware
export const authMiddleware = async (req, res, next) => {
  try {
    // Check for token in Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AuthenticationError('Authentication token missing or malformed');
    }

    // Extract token
    const token = authHeader.split(' ')[1];
    console.log(`Token: ${token}`); // Debugging line to check token

    if (!token) {
      throw new AuthenticationError('Authentication token missing');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(`Decoded token: ${JSON.stringify(decoded)}`); // Debugging line to check decoded token

    // Check if user still exists
    const user = await User.findById(decoded.userId);
    console.log(`User: ${user}`); // Debugging line to check user
    if (!user) {
      throw new AuthenticationError('User account no longer exists or is inactive');
    }

    // Attach user to request
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Token expired',
          code: 'TOKEN_EXPIRED'
        }
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid token',
          code: 'INVALID_TOKEN'
        }
      });
    }

    if (error instanceof AuthenticationError) {
      return res.status(401).json({
        success: false,
        error: {
          message: error.message,
          code: 'AUTH_ERROR'
        }
      });
    }

    // For unexpected errors
    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      error: {
        message: 'Internal authentication error',
        code: 'INTERNAL_ERROR'
      }
    });
  }
};

// Role-based access control middleware
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        throw new AuthenticationError('User not authenticated');
      }

      if (!roles.includes(req.user.role)) {
        throw new AuthorizationError('You do not have permission to perform this action');
      }

      next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
}};