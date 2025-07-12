import React from "react";
import { Link } from "react-router-dom";
import { Item } from "../types";
import { MapPin, Star, Clock, Heart } from "lucide-react";

interface ItemCardProps {
  item: Item;
  showStatus?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, showStatus = false }) => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new":
        return "badge-success";
      case "like-new":
        return "badge-primary";
      case "good":
        return "badge-warning";
      case "fair":
        return "badge-error";
      default:
        return "badge-gray";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "badge-success";
      case "pending":
        return "badge-warning";
      case "rejected":
        return "badge-error";
      case "swapped":
        return "badge-gray";
      default:
        return "badge-gray";
    }
  };

  return (
    <Link to={`/item/${item.id}`} className="block group">
      <div className="card-hover">
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Condition badge */}
          <div className="absolute top-4 left-4">
            <span className={`${getConditionColor(item.condition)}`}>
              {item.condition}
            </span>
          </div>

          {/* Status badge */}
          {showStatus && (
            <div className="absolute top-4 right-4">
              <span className={`${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>
          )}

          {/* Points badge */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/95 dark:bg-dark-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-soft">
              <span className="text-sm font-bold text-gradient-primary">
                {item.pointValue} pts
              </span>
            </div>
          </div>

          {/* Favorite button */}
          <button
            className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-full shadow-soft opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4 text-gray-600 dark:text-gray-400 hover:text-error-500 transition-colors" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-1 mb-2">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4 leading-relaxed">
            {item.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {item.uploaderAvatar ? (
                <img
                  src={item.uploaderAvatar}
                  alt={item.uploaderName}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
                />
              ) : (
                <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {item.uploaderName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {item.uploaderName}
                </span>
                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-xs">4.8</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span className="text-xs">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full font-medium">
                +{item.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
