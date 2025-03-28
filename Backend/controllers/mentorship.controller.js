import MentorshipRequest from '../models/mentorshipRequest.model.js';
import User from '../models/user.model.js';

// Helper function to get mentor by email
const getMentor = async (email) => {
  return await User.findOne({ email, role: 'Mentor' });
};

// Get all mentorship requests for a mentor
export const getMentorshipRequests = async (req, res) => {
  try {
    const mentor = await getMentor(req.userId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found or not authorized' });
    }
    
    const requests = await MentorshipRequest.find({ mentor: mentor._id })
      .populate('learner', 'name email profilePicture skills')
      .sort({ createdAt: -1 });
    
    const pendingCount = await MentorshipRequest.countDocuments({ 
      mentor: mentor._id, 
      status: 'pending' 
    });
    
    const activeCount = await MentorshipRequest.countDocuments({ 
      mentor: mentor._id, 
      status: 'approved' 
    });
    
    res.json({
      requests,
      stats: {
        pending: pendingCount,
        active: activeCount
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve a mentorship request
export const approveRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const mentor = await getMentor(req.userId);
    
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found or not authorized' });
    }
    
    const request = await MentorshipRequest.findOneAndUpdate(
      { _id: requestId, mentor: mentor._id },
      { status: 'approved' },
      { new: true }
    ).populate('learner', 'name email profilePicture');
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found or not authorized' });
    }
    
    // Add mentor-mentee relationship to user models
    await User.findByIdAndUpdate(request.learner._id, {
      $addToSet: { mentee: mentor._id }
    });
    
    await User.findByIdAndUpdate(mentor._id, {
      $addToSet: { mentor: request.learner._id }
    });
    
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Decline a mentorship request
export const declineRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const mentor = await getMentor(req.userId);
    
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found or not authorized' });
    }
    
    const request = await MentorshipRequest.findOneAndUpdate(
      { _id: requestId, mentor: mentor._id },
      { status: 'declined' },
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found or not authorized' });
    }
    
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get mentor dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const mentor = await getMentor(req.userId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found or not authorized' });
    }

    const [pendingRequests, activeMentees, sessionsThisWeek] = await Promise.all([
      MentorshipRequest.countDocuments({ mentor: mentor._id, status: 'pending' }),
      MentorshipRequest.countDocuments({ mentor: mentor._id, status: 'approved' }),
      MentorshipRequest.countDocuments({ 
        mentor: mentor._id,
        'scheduledSessions.date': { 
          $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          $lte: new Date()
        },
        'scheduledSessions.status': 'completed'
      })
    ]);
    
    // Count skills validated by this mentor from endorsements
    const skillsValidated = await User.aggregate([
      { $match: { 'endorsements.endorsedBy': mentor._id.toString() } },
      { $unwind: '$endorsements' },
      { $match: { 'endorsements.endorsedBy': mentor._id.toString() } },
      { $group: { _id: null, count: { $sum: 1 } } }
    ]);
    
    res.json({
      pendingRequests,
      activeMentees,
      sessionsThisWeek,
      skillsValidated: skillsValidated[0]?.count || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get today's sessions for mentor
export const getTodaysSessions = async (req, res) => {
  try {
    const mentor = await getMentor(req.userId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found or not authorized' });
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    
    const requests = await MentorshipRequest.find({
      mentor: mentor._id,
      status: 'approved',
      'scheduledSessions.date': {
        $gte: todayStart,
        $lte: todayEnd
      },
      'scheduledSessions.status': 'scheduled'
    })
    .populate('learner', 'name profilePicture')
    .select('learner scheduledSessions skills');
    
    const sessions = requests.flatMap(request => 
      request.scheduledSessions
        .filter(session => 
          session.date >= todayStart && 
          session.date <= todayEnd && 
          session.status === 'scheduled'
        )
        .map(session => ({
          id: session._id,
          title: request.skills.map(s => s.name).join(', '),
          with: request.learner.name,
          withImage: request.learner.profilePicture,
          time: session.date,
          duration: session.duration,
          meetingLink: session.meetingLink
        }))
    );
    
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Validate a skill for a mentee
export const validateSkill = async (req, res) => {
  try {
    const { menteeId, skill } = req.body;
    const mentor = await getMentor(req.userId);
    
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found or not authorized' });
    }
    
    // Add endorsement
    const updatedUser = await User.findByIdAndUpdate(
      menteeId,
      {
        $addToSet: { 
          endorsements: {
            skill,
            endorsedBy: mentor._id.toString()
          },
          skills: skill
        },
        $set: { 'verificationStatus.skillVerified': true }
      },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Mentee not found' });
    }
    
    res.json({ message: 'Skill validated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


