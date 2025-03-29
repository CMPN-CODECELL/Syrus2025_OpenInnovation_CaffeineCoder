import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Search, CheckCircle, PlusCircle } from 'lucide-react';

function EmployerDashboard() {
  return (
    <div className="space-y-8 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employer Dashboard</h1>
        <Link
          to="/post-job"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <PlusCircle className="h-5 w-5" />
          Post New Job
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <Briefcase className="h-8 w-8 text-blue-600 mb-2" />
          <h3 className="font-semibold">Active Listings</h3>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <Users className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="font-semibold">Total Applicants</h3>
          <p className="text-2xl font-bold">45</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <Search className="h-8 w-8 text-yellow-600 mb-2" />
          <h3 className="font-semibold">Talent Matches</h3>
          <p className="text-2xl font-bold">15</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <CheckCircle className="h-8 w-8 text-purple-600 mb-2" />
          <h3 className="font-semibold">Positions Filled</h3>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Applications</h2>
          <ul className="space-y-4">
            <li className="border-b pb-4">
              <p className="font-semibold">Senior Frontend Developer</p>
              <p className="text-gray-600">4 new applications</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">Posted 2 days ago</p>
                <button className="text-blue-600 hover:underline">Review</button>
              </div>
            </li>
            <li className="border-b pb-4">
              <p className="font-semibold">Full Stack Engineer</p>
              <p className="text-gray-600">2 new applications</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">Posted 5 days ago</p>
                <button className="text-blue-600 hover:underline">Review</button>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recommended Candidates</h2>
          <ul className="space-y-4">
            <li className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-semibold">David Wilson</p>
                <p className="text-sm text-gray-600">Frontend Developer</p>
                <p className="text-sm text-gray-500">98% match for Senior Frontend role</p>
              </div>
              <button className="text-blue-600 hover:underline">View Profile</button>
            </li>
            <li className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-semibold">Rachel Thompson</p>
                <p className="text-sm text-gray-600">Full Stack Developer</p>
                <p className="text-sm text-gray-500">95% match for Full Stack role</p>
              </div>
              <button className="text-blue-600 hover:underline">View Profile</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EmployerDashboard;