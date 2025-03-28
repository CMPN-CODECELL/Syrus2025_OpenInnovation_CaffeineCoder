const Employer = require('../models/employer.model');
const Job = require('../models/jobs.model');
const User = require('../models/user.model');

exports.getEmployerDashboard = async (req, res) => {
  try {
    const employerId = req.user.employerId; // Assuming auth middleware adds this
    
    const activeListings = await Job.countDocuments({ 
      employerId, 
      isActive: true 
    });
    
    const recentJobs = await Job.find({ employerId })
      .sort({ createdAt: -1 })
      .limit(2)
      .populate('applications.userId', 'name email');
    
    const totalApplicants = await Job.aggregate([
      { $match: { employerId } },
      { $project: { count: { $size: "$applications" } } },
      { $group: { _id: null, total: { $sum: "$count" } } }
    ]);
    
    const positionsFilled = await Job.countDocuments({ 
      employerId, 
      'applications.status': 'hired' 
    });
    
    // Talent matches would require matching algorithm (simplified here)
    const talentMatches = await User.find({ /* matching criteria */ }).limit(15).countDocuments();
    
    // Recommended candidates would require matching algorithm
    const recommendedCandidates = await User.find({ /* matching criteria */ })
      .limit(2)
      .select('name title skills'); // Adjust fields as needed
    
    res.json({
      activeListings,
      recentJobs,
      totalApplicants: totalApplicants[0]?.total || 0,
      positionsFilled,
      talentMatches,
      recommendedCandidates
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};