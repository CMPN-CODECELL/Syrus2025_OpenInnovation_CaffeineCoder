import mongoose from "mongoose";

const MentorshipRequestSchema = new mongoose.Schema({
  learner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skills: [{
    name: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'] }
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'declined', 'completed'],
    default: 'pending'
  },
  message: String,
  scheduledSessions: [{
    date: Date,
    duration: Number, // in minutes
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    meetingLink: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('MentorshipRequest', MentorshipRequestSchema);