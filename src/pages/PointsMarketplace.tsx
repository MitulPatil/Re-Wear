import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { PointsReward } from "../types";
import { ShoppingCart, Gift, Star, Zap, Filter, Search } from "lucide-react";

const PointsMarketplace: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock points rewards data
  const pointsRewards: PointsReward[] = [
    {
      id: "1",
      title: "Premium Denim Jacket",
      description: "High-quality denim jacket from sustainable fashion brand",
      image:
        "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
      pointsCost: 500,
      category: "clothing",
      available: true,
      stock: 5,
    },
    {
      id: "2",
      title: "Designer Handbag",
      description: "Elegant leather handbag perfect for any occasion",
      image:
        "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800",
      pointsCost: 800,
      category: "accessories",
      available: true,
      stock: 3,
    },
    {
      id: "3",
      title: "Sustainable Fashion Voucher",
      description: "$50 voucher for eco-friendly fashion brands",
      image:
        "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800",
      pointsCost: 300,
      category: "voucher",
      available: true,
      stock: 20,
    },
    {
      id: "4",
      title: "Premium Sneakers",
      description: "Comfortable and stylish sneakers for everyday wear",
      image:
        "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800",
      pointsCost: 600,
      category: "clothing",
      available: true,
      stock: 8,
    },
    {
      id: "5",
      title: "Exclusive Member Badge",
      description:
        "Special badge showing your commitment to sustainable fashion",
      image:
        "https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=800",
      pointsCost: 200,
      category: "premium",
      available: true,
      stock: 100,
    },
    {
      id: "6",
      title: "Fashion Consultation",
      description:
        "30-minute virtual consultation with a sustainable fashion expert",
      image:
        "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800",
      pointsCost: 400,
      category: "premium",
      available: true,
      stock: 15,
    },
    {
      id: "7",
      title: "Eco-Friendly Jewelry Set",
      description: "Beautiful jewelry made from recycled materials",
      image:
        "https://images.pexels.com/photos/6311479/pexels-photo-6311479.jpeg?auto=compress&cs=tinysrgb&w=800",
      pointsCost: 350,
      category: "accessories",
      available: true,
      stock: 12,
    },
    {
      id: "8",
      title: "Premium Membership",
      description: "Upgrade to premium member with exclusive benefits",
      image:
        "https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=800",
      pointsCost: 1000,
      category: "premium",
      available: true,
      stock: 50,
    },
  ];

  const categories = [
    { id: "all", name: "All Rewards", icon: Gift },
    { id: "clothing", name: "Clothing", icon: ShoppingCart },
    { id: "accessories", name: "Accessories", icon: Star },
    { id: "premium", name: "Premium", icon: Zap },
    { id: "voucher", name: "Vouchers", icon: Gift },
  ];

  const filteredRewards = pointsRewards.filter((reward) => {
    const matchesCategory =
      selectedCategory === "all" || reward.category === selectedCategory;
    const matchesSearch =
      reward.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && reward.available;
  });

  const handlePurchase = (reward: PointsReward) => {
    if (user && user.points >= reward.pointsCost) {
      // Here you would typically make an API call to process the purchase
      alert(
        `Congratulations! You've purchased ${reward.title} for ${reward.pointsCost} points!`
      );
    } else {
      alert(
        "Not enough points for this reward. Keep earning points by listing items and making swaps!"
      );
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-primary-100 rounded-xl">
            <Gift className="h-8 w-8 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Points Marketplace
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Redeem your points for amazing rewards
            </p>
          </div>
        </div>

        {/* Points Display */}
        <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Points Balance</h2>
              <p className="text-primary-100">
                Keep earning points by listing items and making swaps!
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{user.points}</div>
              <div className="text-primary-100">Points Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search rewards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          Showing {filteredRewards.length} rewards available
        </p>
      </div>

      {/* Rewards Grid */}
      {filteredRewards.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRewards.map((reward) => (
            <div
              key={reward.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Reward Image */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                <img
                  src={reward.image}
                  alt={reward.title}
                  className="w-full h-full object-cover"
                />
                {reward.stock && reward.stock < 10 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Only {reward.stock} left!
                  </div>
                )}
              </div>

              {/* Reward Content */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {reward.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {reward.description}
                </p>

                {/* Points Cost */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-bold text-lg text-primary-600 dark:text-primary-400">
                      {reward.pointsCost}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      points
                    </span>
                  </div>
                  {reward.stock && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {reward.stock} in stock
                    </span>
                  )}
                </div>

                {/* Purchase Button */}
                <button
                  onClick={() => handlePurchase(reward)}
                  disabled={user.points < reward.pointsCost}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    user.points >= reward.pointsCost
                      ? "bg-primary-600 hover:bg-primary-700 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {user.points >= reward.pointsCost
                    ? "Redeem Now"
                    : "Not Enough Points"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No rewards found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your search terms or filters to find what you're
            looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default PointsMarketplace;
