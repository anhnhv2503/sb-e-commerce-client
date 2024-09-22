import React from "react";

const PreviewImages = ({ imageUrls, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
        <div className="relative">
          {imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt="Preview"
              className="w-96 h-96 object-cover rounded-md mx-auto my-4"
            />
          ))}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-2 text-white bg-indigo-600 rounded-full px-3 py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewImages;
