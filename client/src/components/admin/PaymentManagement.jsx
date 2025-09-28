import React from "react";
import { CreditCard, DollarSign } from "lucide-react";

const PaymentManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
        <p className="text-gray-600">Manage payments and transactions</p>
      </div>

      <div className="bg-white rounded-lg shadow p-8 text-center">
        <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Payment Management
        </h3>
        <p className="text-gray-600">
          Payment management features coming soon...
        </p>
      </div>
    </div>
  );
};

export default PaymentManagement;
