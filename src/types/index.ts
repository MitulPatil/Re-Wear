export interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  isAdmin: boolean;
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
  joinedAt: Date;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: "new" | "like-new" | "good" | "fair";
  tags: string[];
  images: string[];
  uploaderId: string;
  uploaderName: string;
  uploaderAvatar?: string;
  pointValue: number;
  status: "pending" | "approved" | "rejected" | "swapped";
  createdAt: Date;
  updatedAt: Date;
}

export interface SwapRequest {
  id: string;
  itemId: string;
  requesterId: string;
  requesterName: string;
  offeredItemId?: string;
  pointsOffered?: number;
  message: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  createdAt: Date;
}

export interface Purchase {
  id: string;
  itemId: string;
  buyerId: string;
  buyerName: string;
  itemTitle: string;
  itemImage: string;
  pointsSpent: number;
  purchaseDate: Date;
  status: "completed" | "shipped" | "delivered";
}

export interface PointsReward {
  id: string;
  title: string;
  description: string;
  image: string;
  pointsCost: number;
  category: "clothing" | "accessories" | "premium" | "voucher";
  available: boolean;
  stock?: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface ItemContextType {
  items: Item[];
  swapRequests: SwapRequest[];
  purchases: Purchase[];
  addItem: (
    item: Omit<
      Item,
      "id" | "uploaderId" | "uploaderName" | "createdAt" | "updatedAt"
    >
  ) => void;
  updateItemStatus: (itemId: string, status: Item["status"]) => void;
  createSwapRequest: (request: Omit<SwapRequest, "id" | "createdAt">) => void;
  updateSwapRequest: (requestId: string, status: SwapRequest["status"]) => void;
  createPurchase: (purchase: Omit<Purchase, "id" | "purchaseDate">) => void;
  getUserItems: (userId: string) => Item[];
  getUserSwapRequests: (userId: string) => SwapRequest[];
  getUserPurchases: (userId: string) => Purchase[];
  getFeaturedItems: () => Item[];
  getApprovedItems: () => Item[];
  getPendingItems: () => Item[];
}
