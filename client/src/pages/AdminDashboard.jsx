import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { 
  Users, 
  Package, 
  CreditCard, 
  TrendingUp, 
  Image,
  Settings,
  BarChart3,
  ShoppingCart,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

// Import dashboard components (we'll create these)
import AdminOverview from '../components/admin/AdminOverview';
import UserManagement from '../components/admin/UserManagement';
import CategoryManagement from '../components/admin/CategoryManagement';
import PaymentManagement from '../components/admin/PaymentManagement';
import SalesReports from '../components/admin/SalesReports';
import BannerManagement from '../components/admin/BannerManagement';

const AdminDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Overview', href: '/admin', icon: BarChart3, current: location.pathname === '/admin' },
    { name: 'User Management', href: '/admin/users', icon: Users, current: location.pathname === '/admin/users' },
    { name: 'Category Management', href: '/admin/categories', icon: Package, current: location.pathname === '/admin/categories' },
    { name: 'Payment Management', href: '/admin/payments', icon: CreditCard, current: location.pathname === '/admin/payments' },
    { name: 'Sales Reports', href: '/admin/reports', icon: TrendingUp, current: location.pathname === '/admin/reports' },
    { name: 'Banner Management', href: '/admin/banners', icon: Image, current: location.pathname === '/admin/banners' },
  ];

  const stats = [
    { name: 'Total Users', value: '2,847', change: '+12%', changeType: 'positive', icon: Users },
    { name: 'Total Orders', value: '1,234', change: '+8%', changeType: 'positive', icon: ShoppingCart },
    { name: 'Revenue', value: '$45,678', change: '+15%', changeType: 'positive', icon: TrendingUp },
    { name: 'Active Sellers', value: '156', change: '+3%', changeType: 'positive', icon: UserCheck },
  ];

  const recentActivities = [
    { id: 1, type: 'user', message: 'New user registered: John Doe', time: '2 minutes ago', icon: Users, color: 'text-blue-600' },
    { id: 2, type: 'order', message: 'Order #1234 completed successfully', time: '5 minutes ago', icon: CheckCircle, color: 'text-green-600' },
    { id: 3, type: 'payment', message: 'Payment of $89.99 processed', time: '10 minutes ago', icon: CreditCard, color: 'text-purple-600' },
    { id: 4, type: 'alert', message: 'Low stock alert: Paracetamol 500mg', time: '15 minutes ago', icon: AlertTriangle, color: 'text-yellow-600' },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - MedicineVendor</title>
        <meta name="description" content="Admin dashboard for managing the platform" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="flex">
          {/* Sidebar */}
          <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
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
              <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
              <div className="w-8"></div>
            </div>

            <main className="p-6">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'Admin'}!</h1>
                <p className="text-gray-600 mt-2">Here's what's happening with your platform today.</p>
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
                {/* Recent Activities */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="flex items-center space-x-3">
                            <div className={`flex-shrink-0 ${activity.color}`}>
                              <activity.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900">{activity.message}</p>
                              <p className="text-xs text-gray-500">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        <Link
                          to="/admin/users"
                          className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <Users className="h-5 w-5 text-primary-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">Manage Users</span>
                        </Link>
                        <Link
                          to="/admin/categories"
                          className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <Package className="h-5 w-5 text-primary-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">Manage Categories</span>
                        </Link>
                        <Link
                          to="/admin/payments"
                          className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <CreditCard className="h-5 w-5 text-primary-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">View Payments</span>
                        </Link>
                        <Link
                          to="/admin/reports"
                          className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <TrendingUp className="h-5 w-5 text-primary-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">Sales Reports</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Routes */}
              <Routes>
                <Route path="/" element={<AdminOverview />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/categories" element={<CategoryManagement />} />
                <Route path="/payments" element={<PaymentManagement />} />
                <Route path="/reports" element={<SalesReports />} />
                <Route path="/banners" element={<BannerManagement />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
