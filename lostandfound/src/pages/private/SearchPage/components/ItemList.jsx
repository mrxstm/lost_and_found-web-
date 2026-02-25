import ProductCard from "../../../../components/ProductCard";


function ItemList({ items, loading, error }) {
    

    const totalItems = items.length;

    return(
        <div className="mt-12 bg-[#111827] ">
            <h3 className="text-[#9ca3af] ml-14">Found <b className="text-white">{totalItems}</b> items</h3>

              {/* Loading state */}
               {loading && (
                    <div className="text-center text-gray-400 mt-16">
                        Loading items...
                    </div>
                )}


                {/* Error state */}
                {!loading && error && (
                    <div className="text-center text-red-500 mt-16">
                        {error}
                    </div>
                )}
            
                {/* Success state */}
                {!loading && !error && (
                        <div className="mt-14 ml-20 grid grid-cols-4 gap-y-20"> 
                        {
                            items.map((item)=> {
                                return(
                                    <ProductCard
                                        key={item.id}
                                        id={item.id}
                                        item_name={item.itemName}
                                        image={`http://localhost:5000${item.image_urls[0]}`}
                                        location={item.Location?.name}
                                        date={item.date?.substring(0,10)}
                                        fromPage="search"
                                        status={item.status}
                                    />
                                );
                            })
                        }
                        </div>
                    )
                }

                {/* Empty state */}
                {!loading && !error && items.length === 0 && (
                    <div className="text-center text-red-500 mt-16">
                        No items found
                    </div>
                )}
        </div>
     
    );
}

export default ItemList;