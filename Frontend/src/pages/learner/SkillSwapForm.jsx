import React, { useState } from 'react';
import { User, BookOpen, Book, CheckCircle, X } from 'lucide-react';

function SkillSwapForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    skillTeaching: '',
    skillLearning: '',
    experienceLevel: 'beginner',
    availability: []
  });

  const availabilityOptions = [
    { id: 'weekdays', label: 'Weekdays' },
    { id: 'weekends', label: 'Weekends' },
    { id: 'mornings', label: 'Mornings' },
    { id: 'evenings', label: 'Evenings' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvailabilityChange = (optionId) => {
    setFormData(prev => {
      const newAvailability = prev.availability.includes(optionId)
        ? prev.availability.filter(id => id !== optionId)
        : [...prev.availability, optionId];
      return { ...prev, availability: newAvailability };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Skill Swap Request</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skill You Can Teach
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Book className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="skillTeaching"
                  value={formData.skillTeaching}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., React, Cooking, Spanish"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skill You Want to Learn
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="skillLearning"
                  value={formData.skillLearning}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Guitar, Data Science"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Experience Level
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availabilityOptions.map(option => (
                  <div key={option.id} className="flex items-center">
                    <input
                      id={option.id}
                      type="checkbox"
                      checked={formData.availability.includes(option.id)}
                      onChange={() => handleAvailabilityChange(option.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={option.id} className="ml-2 text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-5 w-5" />
                Submit Skill Swap Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SkillSwapForm;