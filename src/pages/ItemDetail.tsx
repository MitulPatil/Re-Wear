import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useItems } from '../contexts/ItemContext'
import { useAuth } from '../contexts/AuthContext'
import { ArrowLeft, Heart, Share2, MessageCircle, Star, Calendar, User } from 'lucide-react'

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { items, createSwapRequest } = useItems()
  const { user } = useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [swapMessage, setSwapMessage] = useState('')
  const [swapType, setSwapType] = useState<'points' | 'item'>('points')

  const item = items.find(i => i.id === id)

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h1>
          <Link to="/browse" className="btn-primary">
            Back to Browse
          </Link>
        </div>
      </div>
    )
  }

  const handleSwapRequest = () => {
    if (!user) {
      alert('Please log in to make a swap request')
      return
    }

    if (swapType === 'points') {
      createSwapRequest({
        itemId: item.id,
        requesterId: user.id,
        requesterName: user.name,
        pointsOffered: item.pointValue,
        message: swapMessage || `I'd like to redeem this item for ${item.pointValue} points.`,
        status: 'pending'
      })
    }

    setShowSwapModal(false)
    setSwapMessage('')
    alert('Swap request sent successfully!')
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new':
        return 'bg-green-100 text-green-800'
      case 'like-new':
        return 'bg-blue-100 text-blue-800'
      case 'good':
        return 'bg-yellow-100 text-yellow-800'
      case 'fair':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/browse"
        className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Browse
      </Link>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="aspect-w-4 aspect-h-3 mb-4">
            <img
              src={item.images[currentImageIndex]}
              alt={item.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          
          {item.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? 'border-primary-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${item.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Item Details */}
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getConditionColor(item.condition)}`}>
                {item.condition}
              </span>
              <span className="text-2xl font-bold text-primary-600">{item.pointValue} points</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {item.description}
            </p>
          </div>

          {/* Item Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Item Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Category:</span>
                <span className="ml-2 font-medium">{item.category}</span>
              </div>
              <div>
                <span className="text-gray-600">Type:</span>
                <span className="ml-2 font-medium">{item.type}</span>
              </div>
              <div>
                <span className="text-gray-600">Size:</span>
                <span className="ml-2 font-medium">{item.size}</span>
              </div>
              <div>
                <span className="text-gray-600">Condition:</span>
                <span className="ml-2 font-medium">{item.condition}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-primary-100 text-primary-800 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Uploader Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Listed by</h3>
            <div className="flex items-center space-x-4">
              {item.uploaderAvatar ? (
                <img
                  src={item.uploaderAvatar}
                  alt={item.uploaderName}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
              )}
              <div>
                <h4 className="font-medium text-gray-900">{item.uploaderName}</h4>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  Listed {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {user && user.id !== item.uploaderId ? (
            <div className="space-y-3">
              <button
                onClick={() => setShowSwapModal(true)}
                className="w-full btn-primary text-lg py-3"
              >
                Request Swap
              </button>
              <button className="w-full btn-outline flex items-center justify-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Message Seller
              </button>
            </div>
          ) : !user ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">Please log in to make a swap request</p>
              <Link to="/login" className="btn-primary">
                Log In
              </Link>
            </div>
          ) : (
            <div className="text-center text-gray-600">
              This is your item
            </div>
          )}
        </div>
      </div>

      {/* Swap Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Swap</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Swap Type
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="points"
                    checked={swapType === 'points'}
                    onChange={(e) => setSwapType(e.target.value as 'points')}
                    className="mr-2"
                  />
                  <span>Redeem with {item.pointValue} points</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="item"
                    checked={swapType === 'item'}
                    onChange={(e) => setSwapType(e.target.value as 'item')}
                    className="mr-2"
                  />
                  <span>Trade with one of my items</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (optional)
              </label>
              <textarea
                value={swapMessage}
                onChange={(e) => setSwapMessage(e.target.value)}
                placeholder="Add a message to the seller..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowSwapModal(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSwapRequest}
                className="flex-1 btn-primary"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemDetail