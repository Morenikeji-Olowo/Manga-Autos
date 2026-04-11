import { MessageCircle } from 'lucide-react'
import React from "react";

const ChatOnWhatsApp = ({ car }) => {
  const handleWhatsApp = () => {
    const phone = "2349133225255"; // admin's number without + or spaces
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${car.basicDetails?.year} ${car.make} ${car.model} listed for ₦${car.price?.toLocaleString()}. Can we discuss?\n\n${window.location.href}`,
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };
  return (
    <>
      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 font-body">WhatsApp</p>
          <p className="text-sm sm:text-base font-semibold">
            +234 802 345 6789
          </p>
        </div>
        <button
          onClick={handleWhatsApp}
          className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-lg font-body"
        >
          Chat
        </button>
      </div>
    </>
  );
};

export default ChatOnWhatsApp;
