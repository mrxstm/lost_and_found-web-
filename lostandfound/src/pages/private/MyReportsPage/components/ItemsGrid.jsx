import ProductCard from "../../../../components/ProductCard";


function ItemsGrid({items, onDelete}) {
    if(!items.length) {
        return <p className="text-gray-400 text-center">No items found</p>
    }
    return(
        <div className="grid grid-cols-3 p-10 gap-y-10">
            {
                items.map((item)=> {
                    return <ProductCard
                        key={item.id}
                        id={item.id}
                        item_name={item.itemName}
                        image={`http://localhost:5000${item.image_urls[0]}`}
                        location={item.Location?.name}
                        date={item.date?.substring(0,10)}
                        fromPage="myReports"
                        onDelete={onDelete}
                    />
                })
            }
        </div>
    );
}

export default ItemsGrid;