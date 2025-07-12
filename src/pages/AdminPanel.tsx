import React, { useState } from 'react'
import { useItems } from '../contexts/ItemContext'
import { useAuth } from '../contexts/AuthContext'
import ItemCard from '../components/ItemCard'
import { Check, X, Eye, AlertTriangle, Package, Users, TrendingUp } from 'lucide-react'

const AdminPanel: React.FC = () => {
  const { getPendingItems, getApprovedItems, updateItemStatus, items } = useItems()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'overview'>('overview')

  if (!user?.isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  const pendingItems = getPendingItems()
  const approvedItems = getApprovedItems()
  const rejectedItems = items.filter(item => item.status === 'rejected')

  const stats = [
    {
      name: 'Total Items',
      value: items.length,
      icon: Package,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      name: 'Pending Review',
      value: pendingItems.length,
      icon: AlertTriangle,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      name: 'Approved',
      value: approvedItems.length,
      icon: Check,
      color: 'text-green-600 bg-green-100'
    },
    {
      name: 'Rejected',
      value: rejectedItems.length,
      icon: X,
      color: 'text-red-600 bg-red-100'
    }
  ]

  const handleApprove = (itemId: string) => {
    updateItemStatus(itemId, 'approved')
  }

  const handleReject = (itemId: string) => {
    updateItemStatus(itemId, 'rejected')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Panel</h1>
        <p className="text-gray-600">Manage and moderate platform content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Review ({pendingItems.length})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'approved'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Approved ({approvedItems.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {items.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-12 w-12 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">by {item.uploaderName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'approved' ? 'bg-green-100 text-green-800' :
                      item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pending' && (
        <div>
          {pendingItems.length > 0 ? (
            <div className="space-y-6">
              {pendingItems.map((item) => (
                <div key={item.id} className="card p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/3">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="lg:w-2/3">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 mb-4">{item.description}</p>
                        </div>
                        <span className="text-lg font-bold text-primary-600">{item.pointValue} pts</span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-600">Category:</span>
                          <span className="ml-2 font-medium">{item.category}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Size:</span>
                          <span className="ml-2 font-medium">{item.size}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Condition:</span>
                          <span className="ml-2 font-medium">{item.condition}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Uploader:</span>
                          <span className="ml-2 font-medium">{item.uploaderName}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(item.id)}
                          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </button>
                        <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pending items</h3>
              <p className="text-gray-600">All items have been reviewed.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'approved' && (
        <div>
          {approvedItems.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {approvedItems.map((item) => (
                <ItemCard key={item.id} item={item} showStatus />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No approved items</h3>
              <p className="text-gray-600">No items have been approved yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminPanel