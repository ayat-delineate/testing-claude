import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { 
  Package, 
  CreditCard, 
  TrendingUp, 
  BarChart3,
  Plus,
  Edit,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

const SellerDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Overview', href: '/seller', icon: BarChart3, current: location.pathname === '/seller' },
    { name: 'Medicine Management', href: '/seller/medicines', icon: Package, current: location.pathname === '/seller/medicines' },
    { name: 'Payment History', href: '/seller/payments', icon: CreditCard, current: location.pathname === '/seller/payments' },
    { name: 'Advertisement Requests', href: '/seller/advertisements', icon: TrendingUp, current: location.pathname === '/seller/advertisements' },
  ];

  const stats = [
    { name: 'Total Medicines', value: '45', change: '+3', changeType: 'positive', icon: Package },
    { name: 'Total Sales', value: '$12,456', change: '+18%', changeType: 'positive', icon: DollarSign },
    { name: 'Orders This Month', value: '89', change: '+12%', changeType: 'positive', icon: TrendingUp },
    { name: 'Pending Orders', value: '7', change: '-2', changeType: 'negative', icon: Clock },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', medicine: 'Paracetamol 500mg', quantity: 2, amount: '$25.98', status: 'completed' },
    { id: 'ORD-002', customer: 'Jane Smith', medicine: 'Ibuprofen 400mg', quantity: 1, amount: '$8.50', status: 'processing' },
    { id: 'ORD-003', customer: 'Mike Johnson', medicine: 'Aspirin 100mg', quantity: 3, amount: '$15.75', status: 'shipped' },
    { id: 'ORD-004', customer: 'Sarah Wilson', medicine: 'Vitamin D3', quantity: 1, amount: '$12.99', status: 'pending' },
  ];

  const lowStockMedicines = [
    { name: 'Paracetamol 500mg', stock: 5, threshold: 10 },
    { name: 'Ibuprofen 400mg', stock: 3, threshold: 10 },
    { name: 'Aspirin 100mg', stock: 8, threshold: 10 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>Seller Dashboard - MedicineVendor</title>
        <meta name="description" content="Seller dashboard for managing medicines and sales" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="flex">
          {/* Sidebar */}
          <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Seller Panel</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="mt-6 px-3">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      item.current
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-3 py-2 text-sm font-medium border-l-4 transition-colors`}
                  >
                    <item.icon
                      className={`${
                        item.current ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 h-5 w-5`}
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 lg:ml-0">
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-lg font-semibold text-gray-900">Seller Dashboard</h1>
              <div className="w-8"></div>
            </div>

            <main className="p-6">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'Seller'}!</h1>
                <p className="text-gray-600 mt-2">Manage your medicines and track your sales performance.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                  <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <stat.icon className="h-8 w-8 text-primary-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                        <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                        <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change} from last month
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                      <Link to="/seller/medicines" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View All
                      </Link>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Medicine
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {recentOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {order.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {order.customer}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {order.medicine}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {order.amount}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Quick Actions & Alerts */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Quick Actions */}
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        <Link
                          to="/seller/medicines"
                          className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-5 w-5 text-primary-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">Add New Medicine</span>
                        </Link>
                        <Link
                          to="/seller/medicines"
                          className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <Edit className="h-5 w-5 text-primary-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">Manage Medicines</span>
                        </Link>
                        <Link
                          to="/seller/payments"
                          className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <CreditCard className="h-5 w-5 text-primary-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">View Payments</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Low Stock Alerts */}
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        {lowStockMedicines.map((medicine, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                            <div className="flex items-center">
                              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{medicine.name}</p>
                                <p className="text-xs text-gray-500">Stock: {medicine.stock}</p>
                              </div>
                            </div>
                            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                              Restock
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Routes */}
              <Routes>
                <Route path="/" element={<div className="mt-8"><p className="text-gray-600">Overview content will be displayed here.</p></div>} />
                <Route path="/medicines" element={<div className="mt-8"><p className="text-gray-600">Medicine management coming soon...</p></div>} />
                <Route path="/payments" element={<div className="mt-8"><p className="text-gray-600">Payment history coming soon...</p></div>} />
                <Route path="/advertisements" element={<div className="mt-8"><p className="text-gray-600">Advertisement requests coming soon...</p></div>} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
