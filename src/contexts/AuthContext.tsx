import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Mock users for demo
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@rewear.com",
    name: "Admin User",
    points: 1000,
    isAdmin: true,
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    joinedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Jane Smith",
    points: 250,
    isAdmin: false,
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    joinedAt: new Date("2024-02-15"),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("rewear_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    // Mock authentication
    const foundUser = mockUsers.find((u) => u.email === email);
    if (foundUser && password === "password") {
      setUser(foundUser);
      localStorage.setItem("rewear_user", JSON.stringify(foundUser));
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    setLoading(true);

    // Mock signup
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      points: 100, // Welcome bonus
      isAdmin: false,
      joinedAt: new Date(),
    };

    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem("rewear_user", JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rewear_user");
  };

  const updateProfile = async (profileData: Partial<User>): Promise<void> => {
    if (!user) {
      throw new Error("No user logged in");
    }

    // Update the user in mock data
    const userIndex = mockUsers.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...profileData };
    }

    // Update current user state
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);

    // Update localStorage
    localStorage.setItem("rewear_user", JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    updateProfile,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
