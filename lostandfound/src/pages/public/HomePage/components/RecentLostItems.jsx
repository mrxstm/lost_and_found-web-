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
        console.log(res);
        
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
      openSignup?.(); // if user is not logged in, open signup modal
    }
  };

  return (
    <div className="bg-[#111827] flex flex-col h-[750px]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white ml-14 mt-16">Recently Lost Items</h1>
        <div className="flex items-center gap-2 mr-10 cursor-pointer">
          <Link to="/search">
            <h3 className="text-[#5DCEA6] font-semibold">View all</h3>
          </Link>
          <img src={arrow} alt="" className="size-4" />
        </div>
      </div>

      <div className="mt-14 ml-20 grid grid-cols-3 gap-y-20">
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
                fromPage="home" // pass "home" for landing page
                openSignup={openSignup} // pass function to handle clicks if needed
            />
            ))
        ) : (
            <p className="text-white col-span-3 text-center">No recent lost items found.</p>
        )}
      </div>
    </div>
  );
}

export default RecentLostItems;