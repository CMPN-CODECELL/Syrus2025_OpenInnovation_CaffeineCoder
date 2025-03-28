import Job from "../models/jobs.model.js";

export const createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('company');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
