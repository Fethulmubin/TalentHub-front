import { Briefcase, Users, Rocket, FileText } from "lucide-react";

export default function Admin() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>

      {/* Promotional Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">Welcome to TalentHub 🎉</h2>
        <p className="text-sm sm:text-lg mb-4">
          TalentHub is a powerful platform that connects <span className="font-bold">job seekers</span> 
          with <span className="font-bold">employers</span>. Whether you’re looking to post jobs, 
          manage applications, or find the perfect opportunity — TalentHub makes it simple, fast, and effective.
        </p>
        <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
          <li className="flex items-center gap-2 sm:gap-3">
            <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" /> 
            Post jobs effortlessly and reach top talent
          </li>
          <li className="flex items-center gap-2 sm:gap-3">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" /> 
            Manage and track applications in real-time
          </li>
          <li className="flex items-center gap-2 sm:gap-3">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300" /> 
            Connect with employers and job seekers easily
          </li>
          <li className="flex items-center gap-2 sm:gap-3">
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" /> 
            A trusted hub for career growth and hiring success
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Employer Card */}
        <div className="bg-white shadow-md p-4 sm:p-6 rounded-xl border hover:shadow-lg transition">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" /> For Employers
          </h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Post jobs, manage applicants, and discover the best candidates tailored for your company.
          </p>
          <button className="w-full sm:w-auto px-4 sm:px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Post a Job
          </button>
        </div>

        {/* Job Seeker Card */}
        <div className="bg-white shadow-md p-4 sm:p-6 rounded-xl border hover:shadow-lg transition">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" /> For Job Seekers
          </h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Explore opportunities, apply with ease, and take the next big step in your career journey.
          </p>
          <button className="w-full sm:w-auto px-4 sm:px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition">
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
