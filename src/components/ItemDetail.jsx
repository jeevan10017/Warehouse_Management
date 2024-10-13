import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ItemDetail = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setLoading(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [item]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setLoading(false);
  };

  const handleImageError = () => {
    setImageLoaded(true);
    setLoading(false);
    toast.error('Failed to load image.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleMouseEnter = (e) => {
    if (!isMobile) {
      setIsHovered(true);
      setHoverPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (!isMobile) {
      setHoverPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex justify-center items-start h-[80vh] w-full bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden no-scrollbar"
         style={{ background: 'radial-gradient(circle, rgb(17,24,39,1) 0%, rgb(17,24,35,1) 100%)' }}>
      <div className="w-full max-w-4xl h-full overflow-y-auto p-6 relative flex flex-col no-scrollbar">
        
        <div className="relative w-full h-64 flex-shrink-0 mb-4 rounded-lg shadow-lg">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-custom-blue animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-custom-blue1 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          )}

          <img
            src={item.image_url}
            alt={item.name}
            className={`w-full h-full object-cover rounded-lg transition-opacity duration-700 ease-in-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </div>

        {isHovered && !isMobile && (
          <div
            className="absolute w-[240px] h-[260px] bg-black rounded-lg shadow-lg drop-shadow-lg border-2 border-gray-900 overflow-hidden z-10  "
            style={{
              top: `${hoverPosition.y - 60}px`,
              left: `${hoverPosition.x - 500}px`,
            }}
          >
            <img
              src={item.image_url}
              alt="Popup"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h2 className="text-3xl font-bold text-white">{item.name}</h2>
        <p className="text-gray-300 mb-4">{item.brand}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-gray-800 via-custom-blue to-gray-900 p-4 rounded-lg hover:bg-gradient-to-l hover:from-custom-blue hover:via-gray-800 hover:to-custom-blue transition-all duration-500 ease-in-out">
            <h3 className="font-semibold text-lg text-white">Category:</h3>
            <p className="text-gray-200">{item.category}</p>
          </div>
          <div className="bg-gradient-to-r from-gray-800 via-custom-blue to-gray-900 p-4 rounded-lg hover:bg-gradient-to-l hover:from-custom-blue hover:via-gray-800 hover:to-custom-blue transition-all duration-500 ease-in-out">
            <h3 className="font-semibold text-lg text-white">Price:</h3>
            <p className="text-gray-200">${item.price}</p>
          </div>
          <div className="bg-gradient-to-r from-gray-800 via-custom-blue to-gray-900 p-4 rounded-lg hover:bg-gradient-to-l hover:from-custom-blue hover:via-gray-800 hover:to-custom-blue transition-all duration-500 ease-in-out">
            <h3 className="font-semibold text-lg text-white">Quantity:</h3>
            <p className="text-gray-200">{item.quantity}</p>
          </div>
          <div className="bg-gradient-to-r from-gray-800 via-custom-blue to-gray-900 p-4 rounded-lg hover:bg-gradient-to-l hover:from-custom-blue hover:via-gray-800 hover:to-custom-blue transition-all duration-500 ease-in-out">
            <h3 className="font-semibold text-lg text-white">Status:</h3>
            <p
              className={`${
                item.status === 'in_stock' ? 'text-green-400' : 'text-red-400'
              } text-gray-200`}
            >
              {item.status.replace('_', ' ').toUpperCase()}
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-gray-800 via-custom-blue to-gray-900 p-4 rounded-lg hover:bg-gradient-to-l hover:from-custom-blue hover:via-gray-800 hover:to-custom-blue transition-all duration-500 ease-in-out">
            <h3 className="font-semibold text-lg text-white">Attributes:</h3>
            <ul className="list-disc list-inside text-gray-200">
              {item.attributes &&
                Object.entries(item.attributes).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key.replace('_', ' ')}:</strong> {value}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
