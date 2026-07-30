'use client';

import React, { useState } from 'react';
import { ShoppingCart, ArrowRight, Check, X, ShieldCheck } from 'lucide-react';
import { CartItem } from '../lib/store';

interface StickyCartProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onClearCart: () => void;
}

export const StickyCart: React.FC<StickyCartProps> = ({
  cart,
  onUpdateQuantity,
  onClearCart
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  if (totalCount === 0) return null;

  const handleCheckout = () => {
    setIsOrdered(true);
    setTimeout(() => {
      onClearCart();
      setIsOrdered(false);
      setIsOpen(false);
    }, 3000);
  };

  return (
    <>
      {/* Sticky Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4">
        <div className="bg-blinkit-green text-white rounded-2xl shadow-2xl p-3 flex items-center justify-between gap-4 border border-blinkit-green-dark">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-extrabold text-white text-base">
              {totalCount}
            </div>
            <div>
              <span className="text-xs text-white/80 block leading-tight">{totalCount} item{totalCount > 1 ? 's' : ''} added</span>
              <span className="text-base font-black text-white leading-tight">₹{totalPrice}</span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-white text-blinkit-green hover:bg-blinkit-yellow hover:text-gray-900 px-5 py-2.5 rounded-xl font-extrabold text-sm flex items-center gap-1.5 transition-all shadow-md active:scale-95"
          >
            <span>View Cart</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cart Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blinkit-green" />
                <h3 className="font-extrabold text-gray-900 text-base">My Cart ({totalCount})</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isOrdered ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-blinkit-green-light text-blinkit-green rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-10 h-10 stroke-[3]" />
                </div>
                <h3 className="text-xl font-black text-gray-900">Order Placed!</h3>
                <p className="text-xs text-gray-500">Delivering to Home - Indiranagar in <strong>10 minutes</strong>.</p>
                <div className="inline-flex items-center gap-1.5 bg-blinkit-yellow-light border border-blinkit-yellow px-3 py-1.5 rounded-xl text-xs font-bold text-gray-900">
                  <ShieldCheck className="w-4 h-4 text-blinkit-green" />
                  <span>Bought with Confidence</span>
                </div>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="p-4 overflow-y-auto space-y-3 flex-1 no-scrollbar">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <img src={item.product.image_url} alt={item.product.name} className="w-12 h-12 object-cover rounded-xl bg-white" />
                        <div>
                          <h4 className="font-bold text-xs text-gray-900 line-clamp-1">{item.product.name}</h4>
                          <span className="text-xs font-black text-gray-900">₹{item.product.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-2 py-1">
                        <button onClick={() => onUpdateQuantity(item.product.id, -1)} className="font-bold text-gray-600 px-1 hover:text-red-500">-</button>
                        <span className="text-xs font-bold text-gray-900">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, 1)} className="font-bold text-gray-600 px-1 hover:text-blinkit-green">+</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Checkout */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-medium">To Pay</span>
                    <span className="font-black text-gray-900 text-lg">₹{totalPrice}</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-blinkit-green hover:bg-blinkit-green-dark text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-blinkit-green/20 flex items-center justify-center gap-2 text-sm transition-all active:scale-95"
                  >
                    <span>PROCEED TO PAY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
