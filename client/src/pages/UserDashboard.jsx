import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import {
  ShoppingCart,
  CreditCard,
  User,
  Settings,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Star,
  Heart,
  Bell,
} from "lucide-react";

const UserDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      name: "Overview",
      href: "/user",
      icon: User,
      current: location.pathname === "/user",
    },
    {
      name: "Order History",
      href: "/user/orders",
      icon: ShoppingCart,
      current: location.pathname === "/user/orders",
    },
    {
      name: "Payment History",
      href: "/user/payments",
      icon: CreditCard,
      current: location.pathname === "/user/payments",
    },
    {
      name: "Profile Settings",
      href: "/user/profile",
      icon: Settings,
      current: location.pathname === "/user/profile",
    },
  ];

  const stats = [
    {
      name: "Total Orders",
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: ShoppingCart,
    },
    {
      name: "Total Spent",
      value: "$456.78",
      change: "+15%",
      changeType: "positive",
      icon: CreditCard,
    },
    {
      name: "Pending Orders",
      value: "2",
      change: "-1",
      changeType: "negative",
      icon: Clock,
    },
    {
      name: "Favorites",
      value: "8",
      change: "+3",
      changeType: "positive",
      icon: Heart,
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      items: 3,
      total: "$89.99",
      status: "completed",
      tracking: "TRK123456",
    },
    {
      id: "ORD-002",
      date: "2024-01-12",
      items: 1,
      total: "$25.50",
      status: "shipped",
      tracking: "TRK123457",
    },
    {
      id: "ORD-003",
      date: "2024-01-10",
      items: 2,
      total: "$45.75",
      status: "processing",
      tracking: null,
    },
    {
      id: "ORD-004",
      date: "2024-01-08",
      items: 4,
      total: "$156.25",
      status: "delivered",
      tracking: "TRK123458",
    },
  ];

  const favoriteMedicines = [
    {
      name: "Paracetamol 500mg",
      price: "$12.99",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop&crop=center",
    },
    {
      name: "Ibuprofen 400mg",
      price: "$8.50",
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop&crop=center",
    },
    {
      name: "Vitamin D3",
      price: "$15.99",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop&crop=center",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>User Dashboard - MedicineVendor</title>
        <meta
          name="description"
          content="User dashboard for managing orders and profile"
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex">
          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">My Account</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
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
                        ? "bg-primary-50 border-primary-500 text-primary-700"
                        : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } group flex items-center px-3 py-2 text-sm font-medium border-l-4 transition-colors`}
                  >
                    <item.icon
                      className={`${
                        item.current
                          ? "text-primary-500"
                          : "text-gray-400 group-hover:text-gray-500"
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
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-lg font-semibold text-gray-900">
                My Dashboard
              </h1>
              <div className="w-8"></div>
            </div>

            <main className="p-6">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {user?.name || "User"}!
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage your orders, payments, and account settings.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                  <div
                    key={stat.name}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <stat.icon className="h-8 w-8 text-primary-600" />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-500">
                          {stat.name}
                        </p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </p>
                        <p
                          className={`text-sm ${
                            stat.changeType === "positive"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
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
                      <h3 className="text-lg font-semibold text-gray-900">
                        Recent Orders
                      </h3>
                      <Link
                        to="/user/orders"
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
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
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Items
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
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
                                {order.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {order.items}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {order.total}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                      order.status
                                    )}`}
                                  >
                                    {getStatusIcon(order.status)}
                                    <span className="ml-1">{order.status}</span>
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Quick Actions & Favorites */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Quick Actions */}
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Quick Actions
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        <Link
                          to="/shop"
                          className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <ShoppingCart className="h-5 w-5 text-primary-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">
                            Continue Shopping
                          </span>
                        </Link>
                        <Link
                          to="/user/orders"
                          className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <Package className="h-5 w-5 text-primary-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">
                            Track Orders
                          </span>
                        </Link>
                        <Link
                          to="/user/payments"
                          className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <CreditCard className="h-5 w-5 text-primary-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">
                            Payment History
                          </span>
                        </Link>
                        <Link
                          to="/user/profile"
                          className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <Settings className="h-5 w-5 text-primary-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">
                            Account Settings
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Favorite Medicines */}
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Favorite Medicines
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {favoriteMedicines.map((medicine, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <img
                              src={medicine.image}
                              alt={medicine.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {medicine.name}
                              </p>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span className="text-xs text-gray-500 ml-1">
                                    {medicine.rating}
                                  </span>
                                </div>
                                <span className="text-sm font-semibold text-primary-600">
                                  {medicine.price}
                                </span>
                              </div>
                            </div>
                            <button className="text-red-500 hover:text-red-700">
                              <Heart className="w-4 h-4 fill-current" />
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
                <Route
                  path="/"
                  element={
                    <div className="mt-8">
                      <p className="text-gray-600">
                        Overview content will be displayed here.
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <div className="mt-8">
                      <p className="text-gray-600">
                        Order history coming soon...
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/payments"
                  element={
                    <div className="mt-8">
                      <p className="text-gray-600">
                        Payment history coming soon...
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <div className="mt-8">
                      <p className="text-gray-600">
                        Profile settings coming soon...
                      </p>
                    </div>
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
