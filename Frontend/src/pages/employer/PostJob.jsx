import React from 'react';
import JobForm from './JobForm';

export default function PostJob() {
  const handleSubmit = async (data) => {
    // TODO: Implement job posting logic with Supabase
    console.log('Job data:', data);
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
