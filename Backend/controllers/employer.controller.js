export const getEmployerDashboard = async (req, res) => {
  try {
    const employerId = req.user.id;
    
    // Active Listings
    const activeListings = await Job.countDocuments({ 
      postedBy: employerId, 
      status: "open" 
    });
    
    // Recent Applications (grouped by job)
    const recentJobs = await Job.find({ postedBy: employerId })
      .sort({ createdAt: -1 })
      .limit(2)
      .populate({
        path: 'applications',
        options: { sort: { appliedAt: -1 }, limit: 1 }
      });
    
    // Total applications (retail applications in UI)
    const totalApplications = await Application.countDocuments({
      jobId: { $in: recentJobs.map(j => j._id) }
    });
    
    // Positions filled
    const positionsFilled = await Job.countDocuments({
      postedBy: employerId,
      status: "filled"
    });
    
    // Talent matches (simplified)
    const talentMatches = await User.countDocuments({
      role: "candidate",
      skills: { $in: ["frontend", "fullstack"] } // Example skills filter
    });
    
    // Recommended candidates
    const recommendedCandidates = await User.aggregate([
      { $match: { role: "candidate" } },
      { $sample: { size: 2 } },
      { $project: { 
          name: 1, 
          title: 1, 
          skills: 1,
          matchPercentage: { $floor: { $multiply: [Math.random(), 9] } + 90 }
        } 
      }
    ]);
    
    res.status(200).json({
      activeListings,
      recentApplications: recentJobs.map(job => ({
        jobTitle: job.title,
        newApplications: job.applications.length,
        postedDate: job.createdAt
      })),
      retailApplications: totalApplications,
      talentMatches,
      positionsFilled,
      recommendedCandidates
    });
    
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error: error.message });
  }
};