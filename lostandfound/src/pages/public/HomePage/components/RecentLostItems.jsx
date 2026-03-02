import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../../../../components/ProductCard";
import arrow from "../../../../assets/images/right-arrow.png";
import useApi from "../../../../hooks/useAPI";
import { useAuth } from "../../../../context/AuthContext";

function RecentLostItems({ openLogin, openSignup }) {
  const { callApi } = useApi();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await callApi("GET", "/item/recent-lost-items", {});
        if (res?.data) setItems(res.data);
      } catch (error) {
        console.error("Error fetching recent lost items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleCardClick = (itemId) => {
    if (user) {
      navigate(`/product?id=${itemId}`);
    } else {
      openSignup?.();
    }
  };

  return (
    <div className="bg-[#111827] flex flex-col py-10 px-4 sm:px-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-md sm:text-xl font-bold text-white">Recently Lost Items</h1>
        <div className="flex items-center gap-2 cursor-pointer">
          <Link to="/search">
            <h3 className="text-[#5DCEA6] font-semibold text-xs sm:text-xs">View all</h3>
          </Link>
          <img src={arrow} alt="" className="size-4" />
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              item_name={item.itemName}
              image={`http://localhost:5000${item.image_urls?.[0]}`}
              location={item.Location?.name}
              date={item.date}
              status={item.status}
              fromPage="home"
              openSignup={openSignup}
            />
          ))
        ) : (
          <p className="text-white col-span-full text-center">No recent lost items found.</p>
        )}
      </div>
    </div>
  );
}

export default RecentLostItems;