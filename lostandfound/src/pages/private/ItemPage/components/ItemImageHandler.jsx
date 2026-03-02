import { useEffect, useState } from "react";

function ItemImageHandler({ itemImage }) {
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        if (itemImage && itemImage.length > 0) {
            setMainImage(`http://localhost:5000${itemImage[0]}`);
        }
    }, [itemImage]);

    if (!itemImage || itemImage.length === 0) return <p>No images available</p>;

    return (
        <div className="mt-6 sm:mt-10 flex flex-col w-full">
            <img
                src={mainImage}
                alt=""
                className="w-full h-[200px] sm:h-[300px] lg:h-[350px] object-cover rounded-2xl"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-4 sm:mt-6 gap-3 sm:gap-6">
                {itemImage.map((img, idx) => (
                    <img
                        key={idx}
                        src={`http://localhost:5000${img}`}
                        alt=""
                        className={`w-full h-14 sm:h-20 lg:h-24 object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform duration-200 ${mainImage === `http://localhost:5000${img}` ? "border-4 border-[#5DCEA6]" : ""}`}
                        onClick={() => setMainImage(`http://localhost:5000${img}`)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ItemImageHandler;