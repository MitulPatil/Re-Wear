import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useItems } from "../contexts/ItemContext";
import ItemCard from "../components/ItemCard";
import {
  Plus,
  Package,
  ArrowUpDown,
  Award,
  Calendar,
  ShoppingBag,
  Truck,
  CheckCircle,
  Settings,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { getUserItems, getUserSwapRequests, getUserPurchases } = useItems();
  const navigate = useNavigate();

  if (!user) return null;

  const userItems = getUserItems(user.id);
  const userSwapRequests = getUserSwapRequests(user.id);
  const userPurchases = getUserPurchases(user.id);

  const stats = [
    {
      name: "Total Points",
      value: user.points,
      icon: Award,
      color: "text-primary-600 bg-primary-100",
    },
    {
      name: "Items Listed",
      value: userItems.length,
      icon: Package,
      color: "text-green-600 bg-green-100",
    },
    {
      name: "Active Swaps",
      value: userSwapRequests.filter((req) => req.status === "pending").length,
      icon: ArrowUpDown,
      color: "text-blue-600 bg-blue-100",
    },
    {
      name: "Member Since",
      value: new Date(user.joinedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      icon: Calendar,
      color: "text-purple-600 bg-purple-100",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-600">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600">
              Manage your items and track your swaps
            </p>
          </div>
          <Link
            to="/edit-profile"
            className="btn-secondary flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>Edit Profile</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className={`card p-6 ${
                stat.name === "Total Points"
                  ? "cursor-pointer hover:shadow-lg transition-shadow"
                  : ""
              }`}
              onClick={
                stat.name === "Total Points"
                  ? () => navigate("/points-marketplace")
                  : undefined
              }
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  {stat.name === "Total Points" && (
                    <p className="text-xs text-primary-600 mt-1">
                      Click to view marketplace
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/add-item"
            className="card p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                <Plus className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">List New Item</h3>
                <p className="text-sm text-gray-600">
                  Add an item to start earning points
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/browse"
            className="card p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Browse Items</h3>
                <p className="text-sm text-gray-600">
                  Find items to swap or redeem
                </p>
              </div>
            </div>
          </Link>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ArrowUpDown className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">Swap Requests</h3>
                <p className="text-sm text-gray-600">
                  {userSwapRequests.length} total requests
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Items */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">My Items</h2>
          <Link to="/add-item" className="btn-primary">
            Add Item
          </Link>
        </div>

        {userItems.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userItems.map((item) => (
              <ItemCard key={item.id} item={item} showStatus />
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No items yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start by listing your first item to earn points and connect with
              other users.
            </p>
            <Link to="/add-item" className="btn-primary">
              List Your First Item
            </Link>
          </div>
        )}
      </div>

      {/* Recent Purchases */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Purchases
          </h2>
          <Link to="/points-marketplace" className="btn-primary">
            View Marketplace
          </Link>
        </div>

        {userPurchases.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPurchases.slice(0, 6).map((purchase) => (
              <div
                key={purchase.id}
                className="card p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={purchase.itemImage}
                    alt={purchase.itemTitle}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 line-clamp-2">
                      {purchase.itemTitle}
                    </h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-sm font-medium text-primary-600">
                        {purchase.pointsSpent} pts
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(purchase.purchaseDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      {purchase.status === "completed" && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {purchase.status === "shipped" && (
                        <Truck className="h-4 w-4 text-blue-500" />
                      )}
                      {purchase.status === "delivered" && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          purchase.status === "completed"
                            ? "text-green-600"
                            : purchase.status === "shipped"
                            ? "text-blue-600"
                            : purchase.status === "delivered"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {purchase.status.charAt(0).toUpperCase() +
                          purchase.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No purchases yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start redeeming your points for amazing rewards in the
              marketplace.
            </p>
            <Link to="/points-marketplace" className="btn-primary">
              Browse Rewards
            </Link>
          </div>
        )}
      </div>

      {/* Recent Swap Requests */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Recent Swap Requests
        </h2>

        {userSwapRequests.length > 0 ? (
          <div className="space-y-4">
            {userSwapRequests.slice(0, 5).map((request) => (
              <div key={request.id} className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {request.requesterName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {request.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        request.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : request.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {request.status}
                    </span>
                    {request.pointsOffered && (
                      <span className="text-sm font-medium text-primary-600">
                        {request.pointsOffered} pts
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <ArrowUpDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No swap requests yet
            </h3>
            <p className="text-gray-600">
              When users are interested in your items, their requests will
              appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
