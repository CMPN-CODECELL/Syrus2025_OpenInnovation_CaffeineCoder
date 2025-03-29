import { Flame, CheckCircle, ChevronRight, Trophy, Calendar } from "lucide-react";

function StreakDashboard() {
  // Hardcoded streak data - in a real app, this would come from your backend
  const streakData = {
    currentStreak: 12,
    longestStreak: 24,
    lastUpdated: "2023-11-15",
    tasks: [
      {
        id: 1,
        name: "LeetCode Challenge",
        currentStreak: 8,
        target: 30,
        completedToday: true,
        history: [
          { date: "2023-11-15", completed: true },
          { date: "2023-11-14", completed: true },
          { date: "2023-11-13", completed: true },
          { date: "2023-11-12", completed: false },
          { date: "2023-11-11", completed: true },
        ],
      },
      {
        id: 2,
        name: "React Coding",
        currentStreak: 5,
        target: 21,
        completedToday: false,
        history: [
          { date: "2023-11-15", completed: false },
          { date: "2023-11-14", completed: true },
          { date: "2023-11-13", completed: true },
          { date: "2023-11-12", completed: true },
          { date: "2023-11-11", completed: true },
        ],
      },
      {
        id: 3,
        name: "UI Design Practice",
        currentStreak: 3,
        target: 14,
        completedToday: true,
        history: [
          { date: "2023-11-15", completed: true },
          { date: "2023-11-14", completed: true },
          { date: "2023-11-13", completed: true },
          { date: "2023-11-12", completed: false },
          { date: "2023-11-11", completed: false },
        ],
      },
    ],
  };

  const calculateCompletionPercentage = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Flame className="text-orange-500 h-5 w-5" />
          Streak Dashboard
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Keep your learning momentum going!
        </p>

        {/* Overall Streak Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800">Current Streak</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">
                  {streakData.currentStreak} days
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Longest Streak</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {streakData.longestStreak} days
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Last Activity</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {new Date(streakData.lastUpdated).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Daily Tasks
          </h3>
          <div className="space-y-4">
            {streakData.tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-gray-800">{task.name}</h4>
                      {task.completedToday ? (
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">
                          <CheckCircle className="h-3 w-3" />
                          Today
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                          Pending
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-sm font-medium text-orange-600">
                        {task.currentStreak} day streak
                      </span>
                      <span className="text-sm text-gray-500">
                        Target: {task.target} days
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-400 to-amber-400 h-2 rounded-full"
                          style={{
                            width: `${calculateCompletionPercentage(
                              task.currentStreak,
                              task.target
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        {calculateCompletionPercentage(
                          task.currentStreak,
                          task.target
                        )}
                        % completed
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <Flame className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="w-0.5 h-full bg-gray-200 my-1"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Completed LeetCode Challenge
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {streakData.lastUpdated} • Extended streak to{" "}
                  {streakData.currentStreak} days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StreakDashboard;