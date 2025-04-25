import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-[60vh] bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold ">
            Welcome, {user?.name || "Owner"} <span className="wave">👋</span>
          </h1>
          <p className="mt-2 text-lg">
            Restaurant Management Dashboard
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Link
            to="/dashboard/profile"
            className="px-4 py-2 text-sm font-medium rounded-md bg-base-100 shadow-sm hover:bg-base-300 transition-colors duration-200 border border-base-300"
          >
            Profile
          </Link>
          <Link
            to="/dashboard/menu"
            className="px-4 py-2 text-sm font-medium rounded-md bg-base-100 shadow-sm hover:bg-base-300 transition-colors duration-200 border border-base-300"
          >
            Our Menu
          </Link>
          <Link
            to="/dashboard/live-orders"
            className="px-4 py-2 text-sm font-medium rounded-md bg-base-100 shadow-sm hover:bg-base-300 transition-colors duration-200 border border-base-300"
          >
            Live Orders
          </Link>
        </div>

        {/* Content Area */}
        <div className="bg-base-100 rounded-lg shadow-sm p-6 sm:p-8 border border-base-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
