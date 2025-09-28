import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;

      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);

      return { success: true, user };
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || "Login failed";
      return { success: false, error: errorMessage };
    }
  };

  const signup = async (userData) => {
    setLoading(true);

    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;

      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);

      return { success: true, user };
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updateProfile = async (updatedData) => {
    setLoading(true);

    try {
      const response = await authAPI.updateProfile(updatedData);
      const updatedUser = response.data;

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setLoading(false);

      return { success: true, user: updatedUser };
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message || "Profile update failed";
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isSeller: user?.role === "seller",
    isUser: user?.role === "user",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
