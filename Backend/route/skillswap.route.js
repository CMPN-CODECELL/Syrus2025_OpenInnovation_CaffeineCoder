import express from 'express';
import User from '../models/user.model.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const skillSwapRouter = express.Router();

skillSwapRouter.get('/getSkillSwapUsers', authMiddleware, async (req, res) => {
    try {
        const { userId } = req;

        const currentUser = await User.findOne({ email: userId });
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const skillSwapUsers = await User.find({
            email: { $ne: userId },
            $or: [
                { skills: { $in: currentUser.wantToLearn } },
                { wantToLearn: { $in: currentUser.skills } } 
            ]
        }).select("name email skills wantToLearn bio profilePicture");

        if (skillSwapUsers.length === 0) {
            return res.status(404).json({ message: "No suitable skill swap users found" });
        }

        res.status(200).json(skillSwapUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




export default skillSwapRouter;