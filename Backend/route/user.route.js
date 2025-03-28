import zod from 'zod';
import { Router } from 'express';
import {UserRegisterSchema , UserLoginSchema } from '../zod-schemas/user.zod.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
export const userRouter = Router();

userRouter.post('/register',async (req,res)=>{
    try {
        const parseResult = UserRegisterSchema.safeParse(req.body);
        console.log(req.body);
        
        if(!parseResult.success){

            return res.status(400).json({message:"Error: "+parseResult.error.message});
        }
        const user = parseResult.data;
        const userExists = await User.findOne({email:user.email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
        const token = jwt.sign({email:user.email,role:user.role},process.env.JWT_SECRET);
        const newUser = new User(user);
        await newUser.save();
        res.status(201).json({message:"User created successfully",token:token});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const parseResult = UserLoginSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ message: parseResult.error.message });
        }

        const user = parseResult.data;

        const userExists = await User.findOne({ email: user.email });
        if (!userExists) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const validPassword = await bcrypt.compare(user.password, userExists.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        res.header.Authorization = token;
        res.status(200).json({ message: "Login successful", token: token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
