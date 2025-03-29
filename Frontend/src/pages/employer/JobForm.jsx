import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';

export default function JobForm({ onSubmit }) {
  const [requirements, setRequirements] = useState(['']);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: [],
    location: '',
    salary: 0,
    employmentType: 'full-time',
  });

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index) => {
    const newRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(newRequirements);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredRequirements = requirements.filter(req => req.trim() !== '');
    onSubmit({
      ...formData,
      requirements: filteredRequirements,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Job Title</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          required
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Requirements</label>
        {requirements.map((req, index) => (
          <div key={index} className="mt-2 flex items-center gap-2">
            <input
              type="text"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2"
              value={req}
              onChange={(e) => handleRequirementChange(index, e.target.value)}
            />
            {index === requirements.length - 1 ? (
              <button
                type="button"
                onClick={addRequirement}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="h-5 w-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="text-red-600 hover:text-red-800"
              >
                <MinusCircle className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Salary</label>
        <input
          type="number"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Employment Type</label>
        <select
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.employmentType}
          onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
        >
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Post Job
      </button>
    </form>
  );
}
