import { Router } from 'express';
import {
  UserRegisterSchema,
  UserLoginSchema,
  UserUpdateSchema
} from '../zod-schemas/user.zod.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

export const userRouter = Router();

// Register endpoint
userRouter.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const parseResult = UserRegisterSchema.safeParse(req.body);

    console.log(parseResult);
    
    if (!parseResult.success) {
      console.log("Validation errors:", parseResult.error);
      return res.status(400).json({ 
        message: "Validation failed",
        errors: parseResult.error.flatten() 
      });
    }

    const userData = parseResult.data;
    console.log(userData);
    
    const userExists = await User.findOne({ email: userData.email });
    
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    // Create new user
    const newUser = new User({
      ...userData,
      tokens: 10, // Initial tokens for new users
      verificationStatus: {
        emailVerified: false,
        skillVerified: false,
        mentorApproved: false
      }
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profilePicture: newUser.profilePicture
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Login endpoint
userRouter.post('/login', async (req, res) => {
  try {
    const parseResult = UserLoginSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      return res.status(400).json({ message: parseResult.error.errors });
    }

    const { email, password } = parseResult.data;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

import { authMiddleware } from '../middleware/auth.middleware.js';

// Protected profile routes
userRouter.get('/profile/:id', authMiddleware, async (req, res) => {
  try {
    // Ensure users can only access their own profile
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.put('/profile/:id', authMiddleware, async (req, res) => {
  try {
    // Ensure users can only update their own profile
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const parseResult = UserUpdateSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      return res.status(400).json({ 
        message: "Validation failed",
        errors: parseResult.error.errors 
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      parseResult.data,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});