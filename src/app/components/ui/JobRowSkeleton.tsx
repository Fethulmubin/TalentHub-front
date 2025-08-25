"use client";

export default function JobRowSkeleton() {
  return (
    <tr className="animate-pulse border-b last:border-none">
      {/* Position + Company */}
      <td className="px-6 py-4">
        <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-28 bg-gray-200 rounded"></div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
      </td>

      {/* Applied Date */}
      <td className="px-6 py-4">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </td>

      {/* Salary */}
      <td className="px-6 py-4">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </td>
    </tr>
  );
}
