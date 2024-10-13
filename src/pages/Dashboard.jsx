import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ItemDetail from '../components/ItemDetail';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaBars } from 'react-icons/fa';
import { LampDemo } from '../components/ui/lamp'; 

const Dashboard = () => {
  const [locations, setLocations] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  useEffect(() => {
    const fetchLocationsAndItems = async () => {
      try {
        const locSnapshot = await getDocs(collection(db, 'locations'));
        const locData = locSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLocations(locData);

        const itemSnapshot = await getDocs(collection(db, 'items'));
        const itemData = itemSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(itemData);
        setFilteredItems(itemData);

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchLocationsAndItems();
  }, []);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsSidebarOpen(false); 
  };

  const handleSearch = (query) => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleFilter = (category) => {
    const filtered = category
      ? items.filter(item => item.category === category)
      : items;
    setFilteredItems(filtered);
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-[#171F2E]">
  //       <GlobeDemo /> 
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-screen w-full bg-gray-900 relative">
      <button
        className="p-2 bg-custom-blue1 fixed top-4 left-4 z-30 md:hidden rounded-md"
        onClick={() => setIsSidebarOpen(prev => !prev)} 
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking overlay
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 bg-gradient-to-t from-gray-800 via-gray-900 to-gray-800 text-gray-300 overflow-y-auto border-r border-gray-700 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:w-96 transition-transform duration-300 ease-in-out backdrop-filter backdrop-blur-lg bg-opacity-70`}
      >
        <Sidebar
          locations={locations}
          items={filteredItems}
          onSelectItem={handleSelectItem}
          onSearch={handleSearch}
          onFilter={handleFilter}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </aside>

      <main className="flex-1 p-6 ml-0 md:ml-16 md:mr-16 flex items-center justify-center overflow-hidden">
        {selectedItem ? (
          <ItemDetail item={selectedItem} />
        ) : (
          <LampDemo /> 
        )}
      </main>
    </div>
  );
};

export default Dashboard;
