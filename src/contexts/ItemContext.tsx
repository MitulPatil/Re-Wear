import React, { createContext, useContext, useState } from "react";
import { Item, SwapRequest, Purchase, ItemContextType } from "../types";

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const useItems = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error("useItems must be used within an ItemProvider");
  }
  return context;
};

// Mock items for demo
const mockItems: Item[] = [
  {
    id: "1",
    title: "Vintage Denim Jacket",
    description:
      "Classic blue denim jacket in excellent condition. Perfect for layering and adding a vintage touch to any outfit.",
    category: "Outerwear",
    type: "Jacket",
    size: "M",
    condition: "good",
    tags: ["vintage", "denim", "casual"],
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    uploaderId: "2",
    uploaderName: "Jane Smith",
    uploaderAvatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    pointValue: 150,
    status: "approved",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Designer Silk Scarf",
    description:
      "Beautiful silk scarf with floral pattern. Adds elegance to any outfit.",
    category: "Accessories",
    type: "Scarf",
    size: "One Size",
    condition: "like-new",
    tags: ["silk", "designer", "elegant"],
    images: [
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    uploaderId: "1",
    uploaderName: "Admin User",
    uploaderAvatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    pointValue: 80,
    status: "approved",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    title: "Cozy Knit Sweater",
    description: "Warm and comfortable knit sweater perfect for cold weather.",
    category: "Tops",
    type: "Sweater",
    size: "L",
    condition: "good",
    tags: ["knit", "warm", "winter"],
    images: [
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    uploaderId: "2",
    uploaderName: "Jane Smith",
    uploaderAvatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    pointValue: 120,
    status: "approved",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    id: "4",
    title: "Classic White T-Shirt",
    description:
      "Essential cotton t-shirt in pristine condition. Perfect for everyday wear.",
    category: "Tops",
    type: "T-Shirt",
    size: "M",
    condition: "new",
    tags: ["cotton", "essential", "casual"],
    images: [
      "https://images.pexels.com/photos/6311479/pexels-photo-6311479.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    uploaderId: "1",
    uploaderName: "Admin User",
    uploaderAvatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    pointValue: 60,
    status: "approved",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "5",
    title: "High-Waisted Jeans",
    description:
      "Trendy high-waisted jeans with a perfect fit. Great for any casual occasion.",
    category: "Bottoms",
    type: "Jeans",
    size: "S",
    condition: "like-new",
    tags: ["denim", "high-waisted", "trendy"],
    images: [
      "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    uploaderId: "2",
    uploaderName: "Jane Smith",
    uploaderAvatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    pointValue: 100,
    status: "approved",
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "6",
    title: "Summer Floral Dress",
    description:
      "Beautiful floral print dress perfect for summer days and special occasions.",
    category: "Dresses",
    type: "Dress",
    size: "M",
    condition: "good",
    tags: ["floral", "summer", "feminine"],
    images: [
      "https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    uploaderId: "1",
    uploaderName: "Admin User",
    uploaderAvatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    pointValue: 90,
    status: "approved",
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "7",
    title: "Leather Crossbody Bag",
    description:
      "Stylish leather crossbody bag with adjustable strap. Perfect for everyday use.",
    category: "Accessories",
    type: "Bag",
    size: "One Size",
    condition: "like-new",
    tags: ["leather", "crossbody", "stylish"],
    images: [
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    uploaderId: "2",
    uploaderName: "Jane Smith",
    uploaderAvatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    pointValue: 120,
    status: "approved",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "8",
    title: "Running Sneakers",
    description:
      "Comfortable running shoes in excellent condition. Great for workouts and casual wear.",
    category: "Shoes",
    type: "Sneakers",
    size: "8",
    condition: "good",
    tags: ["running", "comfortable", "athletic"],
    images: [
      "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    uploaderId: "1",
    uploaderName: "Admin User",
    uploaderAvatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    pointValue: 110,
    status: "approved",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
  },
  {
    id: "9",
    title: "Wool Winter Coat",
    description:
      "Warm wool coat perfect for cold weather. Classic design that never goes out of style.",
    category: "Outerwear",
    type: "Coat",
    size: "L",
    condition: "good",
    tags: ["wool", "winter", "classic"],
    images: [
      "https://images.pexels.com/photos/6311479/pexels-photo-6311479.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    uploaderId: "2",
    uploaderName: "Jane Smith",
    uploaderAvatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    pointValue: 180,
    status: "approved",
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "10",
    title: "Silk Blouse",
    description:
      "Elegant silk blouse with a sophisticated design. Perfect for professional settings.",
    category: "Tops",
    type: "Blouse",
    size: "S",
    condition: "like-new",
    tags: ["silk", "elegant", "professional"],
    images: [
      "https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    uploaderId: "1",
    uploaderName: "Admin User",
    uploaderAvatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    pointValue: 95,
    status: "approved",
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19"),
  },
  {
    id: "11",
    title: "Pencil Skirt",
    description:
      "Classic pencil skirt in a versatile color. Perfect for office wear and formal occasions.",
    category: "Bottoms",
    type: "Skirt",
    size: "M",
    condition: "good",
    tags: ["classic", "office", "formal"],
    images: [
      "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    uploaderId: "2",
    uploaderName: "Jane Smith",
    uploaderAvatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    pointValue: 85,
    status: "approved",
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    id: "12",
    title: "Evening Gown",
    description:
      "Stunning evening gown perfect for special occasions and formal events.",
    category: "Dresses",
    type: "Gown",
    size: "L",
    condition: "like-new",
    tags: ["evening", "formal", "elegant"],
    images: [
      "https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    uploaderId: "1",
    uploaderName: "Admin User",
    uploaderAvatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    pointValue: 200,
    status: "approved",
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-23"),
  },
];

const mockSwapRequests: SwapRequest[] = [];

// Mock purchases for demo
const mockPurchases: Purchase[] = [
  {
    id: "1",
    itemId: "1",
    buyerId: "2",
    buyerName: "Jane Smith",
    itemTitle: "Vintage Denim Jacket",
    itemImage:
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
    pointsSpent: 150,
    purchaseDate: new Date("2024-01-20"),
    status: "delivered",
  },
  {
    id: "2",
    itemId: "2",
    buyerId: "2",
    buyerName: "Jane Smith",
    itemTitle: "Designer Silk Scarf",
    itemImage:
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800",
    pointsSpent: 80,
    purchaseDate: new Date("2024-01-25"),
    status: "shipped",
  },
  {
    id: "3",
    itemId: "4",
    buyerId: "2",
    buyerName: "Jane Smith",
    itemTitle: "Classic White T-Shirt",
    itemImage:
      "https://images.pexels.com/photos/6311479/pexels-photo-6311479.jpeg?auto=compress&cs=tinysrgb&w=800",
    pointsSpent: 60,
    purchaseDate: new Date("2024-01-28"),
    status: "completed",
  },
];

export const ItemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [swapRequests, setSwapRequests] =
    useState<SwapRequest[]>(mockSwapRequests);
  const [purchases, setPurchases] = useState<Purchase[]>(mockPurchases);

  const addItem = (
    itemData: Omit<
      Item,
      "id" | "uploaderId" | "uploaderName" | "createdAt" | "updatedAt"
    >
  ) => {
    const newItem: Item = {
      ...itemData,
      id: Date.now().toString(),
      uploaderId: "2", // Mock current user
      uploaderName: "Current User",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const updateItemStatus = (itemId: string, status: Item["status"]) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, status, updatedAt: new Date() } : item
      )
    );
  };

  const createSwapRequest = (
    requestData: Omit<SwapRequest, "id" | "createdAt">
  ) => {
    const newRequest: SwapRequest = {
      ...requestData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setSwapRequests((prev) => [...prev, newRequest]);
  };

  const updateSwapRequest = (
    requestId: string,
    status: SwapRequest["status"]
  ) => {
    setSwapRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status } : request
      )
    );
  };

  const getUserItems = (userId: string) => {
    return items.filter((item) => item.uploaderId === userId);
  };

  const getUserSwapRequests = (userId: string) => {
    return swapRequests.filter(
      (request) =>
        request.requesterId === userId ||
        items.find((item) => item.id === request.itemId)?.uploaderId === userId
    );
  };

  const getFeaturedItems = () => {
    return items.filter((item) => item.status === "approved").slice(0, 6);
  };

  const getApprovedItems = () => {
    return items.filter((item) => item.status === "approved");
  };

  const getPendingItems = () => {
    return items.filter((item) => item.status === "pending");
  };

  const getUserPurchases = (userId: string) => {
    return purchases.filter((purchase) => purchase.buyerId === userId);
  };

  const createPurchase = (
    purchaseData: Omit<Purchase, "id" | "purchaseDate">
  ) => {
    const newPurchase: Purchase = {
      ...purchaseData,
      id: Date.now().toString(),
      purchaseDate: new Date(),
    };
    setPurchases((prev) => [...prev, newPurchase]);
  };

  const value: ItemContextType = {
    items,
    swapRequests,
    purchases,
    addItem,
    updateItemStatus,
    createSwapRequest,
    updateSwapRequest,
    createPurchase,
    getUserItems,
    getUserSwapRequests,
    getUserPurchases,
    getFeaturedItems,
    getApprovedItems,
    getPendingItems,
  };

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};
