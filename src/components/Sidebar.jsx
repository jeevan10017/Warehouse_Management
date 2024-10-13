import React, { useState } from 'react';
import {
  FaChevronDown,
  FaChevronRight,
  FaBox,
  FaSearch,
  FaFilter,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle
} from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

const TreeItem = ({
  location,
  locations,
  items,
  onSelectItem,
  filter,
  activeLocation,
  setActiveLocation,
  parentActive
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const childrenLocations = locations.filter(
    (loc) => loc.parent_godown === location.id
  );
  const locationItems = items.filter(
    (item) => item.godown_id === location.id
  );

  const hasMatchingItems = (loc) => {
    if (!filter) return true; 

    const matchingItems = items.filter(
      (item) => item.godown_id === loc.id && item.category === filter
    );
    if (matchingItems.length > 0) return true;

    const childLocations = locations.filter(
      (child) => child.parent_godown === loc.id
    );
    return childLocations.some((child) => hasMatchingItems(child));
  };

  if (!hasMatchingItems(location)) return null;

  const isActive = activeLocation === location.id;

  const handleToggle = () => {
    if (isActive) {
      setActiveLocation(null);
      setIsOpen(false);
    } else {
      setActiveLocation(location.id);
      setIsOpen(true);
    }
  };

  return (
    <div className="ml-3">
      <button
        className={`flex items-center justify-between w-full p-2 text-gray-300 dark:text-gray-400 border dark:border-gray-700 rounded-md 
          hover:bg-gradient-to-r from-custom-blue via-gray-800 to-gray-900 focus:outline-none focus:ring-4 focus:ring-custom-blue transition-colors duration-300 
          ${isActive ? 'bg-gradient-to-r from-custom-blue via-gray-800 to-gray-900' : ''}`}
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          {(childrenLocations.length > 0 ||
            locationItems.filter((item) =>
              filter ? item.category === filter : true
            ).length > 0) && (
            isOpen ? (
              <FaChevronDown className="text-sm" />
            ) : (
              <FaChevronRight className="text-sm" />
            )
          )}
          <span className="font-semibold">{location.name}</span>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {isOpen && (
          <div className="ml-4 mt-2">
            {childrenLocations.map((child) => (
              <TreeItem
                key={child.id}
                location={child}
                locations={locations}
                items={items}
                onSelectItem={onSelectItem}
                filter={filter}
                activeLocation={activeLocation}
                setActiveLocation={setActiveLocation}
                parentActive={isActive}
              />
            ))}

            {locationItems
              .filter((item) =>
                filter ? item.category === filter : true
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-2 pl-4 cursor-pointer hover:bg-gradient-to-r from-custom-blue via-custom-blue1 to-gray-800 rounded-md transition-colors duration-300"
                  onClick={() => onSelectItem(item)}
                >
                  <FaBox className="mr-2 text-gray-400" />
                  <span>{item.name}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Sidebar = ({
  locations,
  items,
  onSelectItem,
  onSearch,
  onFilter,
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  const [activeLocation, setActiveLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');


  const [user, loadingUser, errorUser] = useAuthState(auth);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilter(e.target.value);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsSidebarOpen(false); 
      window.location.href = '/login';
    } catch (err) {
      toast.error('Failed to logout. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const rootLocations = locations.filter((loc) => loc.parent_godown === null);

  return (
    <>
      <div className="md:hidden flex justify-end p-4">
        <button onClick={() => setIsSidebarOpen(false)} aria-label="Close Sidebar">
          <FaTimes className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <div className="p-4 mt-4 flex flex-col h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-white">Warehouse Locations</h2>

        <div className="flex items-center mb-2 bg-white bg-opacity-10 backdrop-blur-md p-2 rounded-md">
          <FaSearch className="mr-2 text-gray-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search locations or items"
            className="w-full p-1 bg-transparent border-none text-gray-300 placeholder-cust focus:outline-none"
          />
        </div>

        <div className="flex items-center mb-4 bg-white bg-opacity-10 backdrop-blur-md p-2 rounded-md">
          <FaFilter className="mr-2 text-gray-300" />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-1 bg-gray-700 border-none text-gray-300 focus:outline-none rounded"
          >
            <option className="" value="">All Categories</option>
            <option value="Furniture">Furniture</option>
            <option value="Toys">Toys</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Tools">Tools</option>
          </select>
        </div>

        <div className="flex-grow overflow-y-auto scrollbar-hide">
          {rootLocations.map((location) => (
            <TreeItem
              key={location.id}
              location={location}
              locations={locations}
              items={items}
              onSelectItem={onSelectItem}
              filter={selectedCategory}
              activeLocation={activeLocation}
              setActiveLocation={setActiveLocation}
            />
          ))}
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4">
          {user && (
            <div className="flex items-center mb-4">
              <FaUserCircle className="w-6 h-6 mr-2 text-gray-400" />
              <span className="text-gray-300">{user.email}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-2 text-red-500 hover:text-red-400 transition-colors duration-300 rounded-md"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      <style jsx>{`
        /* Hide scrollbar */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        /* Optionally, adjust the sidebar's scrollbar if needed */
      `}</style>
    </>
  );
};

export default Sidebar;