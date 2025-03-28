import express from 'express';
import User from '../models/user.model.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import SkillSwap from '../models/skillswap.model.js';

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

skillSwapRouter.post('/start-session',authMiddleware,async(req,res)=>{
    const userId = req.headers.userid;
    const role = req.headers.role;
    const {otherUserId} = req.body;

    
    
    if(role !== "Learner"){
        return res.status(403).json({message:"Only learners can start a session"});
    }
    
    const userA = await User.findOne({email:userId});
    const userB = await User.findOne({email:otherUserId});

    
    if(!userA || !userB){
        return res.status(404).json({message:"User not found"});
    }
    if(userA.skills.length===0 || userB.skills.length===0){
        return res.status(400).json({message:"User has no skills to offer"});
    }

    const skillOfferedByA = userA.skills;
    const skillOfferedByB = userB.skills;

    const session=new SkillSwap({
        userA:userA._id,
        userB:userB._id,
        skillOfferedByA:skillOfferedByA,
        skillOfferedByB:skillOfferedByB,
        status:"Pending",
        tokensUsed:0
    });

    try{
        await session.save();
        res.status(201).json({message:"Session started"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})


export default skillSwapRouter;