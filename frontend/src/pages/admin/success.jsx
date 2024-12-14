import { CheckCircle } from 'lucide-react'
import React from 'react'

const Success = () => {
  const navigate=()=>{
    window.location.href = '/cart';
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl p-10 text-center shadow-2xl">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h3>
              <p className="text-gray-600 mb-6">Your order has been processed. Check your email for tracking details.</p>
              <button 
                onClick={navigate}
                className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Back to Orders
              </button>
            </div>
          </div>
  )
}

export default Success