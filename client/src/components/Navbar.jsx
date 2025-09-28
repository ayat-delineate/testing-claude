import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  ShoppingCart,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Menu,
  X,
  Globe,
} from "lucide-react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsProfileDropdownOpen(false);
  };

  const getDashboardPath = () => {
    if (user?.role === "admin") return "/admin";
    if (user?.role === "seller") return "/seller";
    return "/user";
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                MedicineVendor
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Shop
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-primary-600 p-2 rounded-md transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>EN</span>
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsLanguageDropdownOpen(false)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <img
                    src={user?.photo || "https://via.placeholder.com/32"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Update Profile</span>
                    </Link>
                    <Link
                      to={getDashboardPath()}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signup"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Join Us
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/cart"
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart ({getCartItemsCount()})</span>
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Update Profile
                  </Link>
                  <Link
                    to={getDashboardPath()}
                    className="block px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
