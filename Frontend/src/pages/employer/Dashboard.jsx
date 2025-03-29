import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  Search,
  CheckCircle,
  PlusCircle,
} from "lucide-react";

function EmployerDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    activeListings: 0,
    totalApplicants: 0,
    positionsFilled: 0,
    recentApplications: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/employer-dashboard/dashboard",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDashboardData({
          activeListings: response.data.activeListings,
          totalApplicants: response.data.totalApplicants,
          positionsFilled: response.data.positionsFilled,
          recentApplications: response.data.recentApplications,
        });
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch dashboard data"
        );
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="space-y-8">
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
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome back, {user?.email}</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <Briefcase className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-semibold">Active Listings</h3>
            <p className="text-2xl font-bold">{dashboardData.activeListings}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-semibold">Total Applicants</h3>
            <p className="text-2xl font-bold">
              {dashboardData.totalApplicants}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <Search className="h-8 w-8 text-yellow-600 mb-2" />
            <h3 className="font-semibold">Talent Matches</h3>
            <p className="text-2xl font-bold">
              {Math.round(dashboardData.totalApplicants * 0.3)}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <CheckCircle className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-semibold">Positions Filled</h3>
            <p className="text-2xl font-bold">
              {dashboardData.positionsFilled}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Applications</h2>
          <ul className="space-y-4">
            {dashboardData.recentApplications.length > 0 ? (
              dashboardData.recentApplications.map((application, index) => (
                <li key={index} className="border-b pb-4">
                  <p className="font-semibold">{application.jobTitle}</p>
                  <p className="text-gray-600">{application.applicantName}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">
                      Applied{" "}
                      {new Date(application.appliedAt).toLocaleDateString()}
                    </p>
                    <button className="text-blue-600 hover:underline">
                      Review
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No recent applications</p>
            )}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recommended Candidates</h2>
          <ul className="space-y-4">
            <li className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-semibold">David Wilson</p>
                <p className="text-sm text-gray-600">Frontend Developer</p>
                <p className="text-sm text-gray-500">
                  98% match for Senior Frontend role
                </p>
              </div>
              <button className="text-blue-600 hover:underline">
                View Profile
              </button>
            </li>
            <li className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-semibold">Rachel Thompson</p>
                <p className="text-sm text-gray-600">Full Stack Developer</p>
                <p className="text-sm text-gray-500">
                  95% match for Full Stack role
                </p>
              </div>
              <button className="text-blue-600 hover:underline">
                View Profile
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EmployerDashboard;
