import React from 'react';
import JobForm from './JobForm';
import axios from 'axios';

export default function PostJob() {
  const handleSubmit = async (data) => {
    try {
      // Extract at least one skill from requirements if they exist
      const skillsFromRequirements = data.requirements && data.requirements.length > 0
        ? [data.requirements[0]] // Use first requirement as a skill
        : ['General']; // Fallback to a default skill

      const jobData = {
        title: data.title,
        description: data.description,
        requirements: data.requirements,
        skillsRequired: skillsFromRequirements, // Now guaranteed to have at least one skill
        employmentType: data.employmentType,
        location: data.location,
        salary: data.salary,
        remote: true,
        deadline: "2027-12-31"
      };

      const token = localStorage.getItem('token') || 'your-auth-token-here';

      const response = await axios.post(
        'http://localhost:3000/jobs/post-job',
        jobData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Job posted successfully:', response.data);
      alert('Job posted successfully!');
    } catch (error) {
      console.error('Error posting job:', error);
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => err.message);
        alert(`Validation errors:\n${errorMessages.join('\n')}`);
      } else {
        alert('Failed to post job. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <JobForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}