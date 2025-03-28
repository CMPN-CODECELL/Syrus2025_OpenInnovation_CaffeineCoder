import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verified.email;
        console.log(verified.email);
        
        req.role = verified.role;
        console.log("Passed Middleware");
        
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};


// Add to your existing auth middleware
const Employer = require('../models/employer.model');

export const employerAuthMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'employer') {
      return res.status(403).json({ message: 'Employer access only' });
    }
    
    const employer = await Employer.findOne({ userId: user._id });
    if (!employer) {
      return res.status(403).json({ message: 'Employer profile not found' });
    }
    
    req.employer = employer;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};