import ProductCard from "../../../../components/ProductCard";

function ItemsGrid({ items, onDelete }) {
    if (!items.length) {
        return <p className="text-gray-400 text-center">No items found</p>
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-6 sm:p-10 gap-14">
            {items.map((item) => (
                <ProductCard
                    key={item.id}
                    id={item.id}
                    item_name={item.itemName}
                    image={`http://localhost:5000${item.image_urls[0]}`}
                    location={item.Location?.name}
                    date={item.date?.substring(0, 10)}
                    fromPage="myReports"
                    onDelete={onDelete}
                    isApproved={item.isApproved}
                />
            ))}
        </div>
    );
}

export default ItemsGrid;