import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

const SalesReports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Sales Reports</h2>
        <p className="text-gray-600">View sales analytics and reports</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Sales Reports</h3>
        <p className="text-gray-600">Sales reporting features coming soon...</p>
      </div>
    </div>
  );
};

export default SalesReports;
