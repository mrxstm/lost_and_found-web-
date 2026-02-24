import { useEffect, useState } from "react";

function ItemImageHandler({itemImage}) {

    //main image
    const [mainImage, setMainImage] = useState("");

     useEffect(()=> {
        if(itemImage && itemImage.length > 0) {
            setMainImage(`http://localhost:5000${itemImage[0]}`);
        }
     }, [itemImage])

     if (!itemImage || itemImage.length === 0) return <p>No images available</p>;

    return(
            <div className="mt-10 flex flex-col ml-10 w-fit">
                <img src={mainImage} alt="" className="w-[900px] h-[550px] object-cover rounded-2xl"/>
                <div className="flex grid grid-cols-4 mt-10 w-[900px] gap-10">
                    {itemImage.map((img, idx) => (
                        <img 
                            key={idx}
                            src={`http://localhost:5000${img}`} 
                            alt="" 
                            className={`w-[400px] h-[140px] object-cover rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-200 ${mainImage === `http://localhost:5000${img}`? "border-4 border-[#5DCEA6]": ""}`}
                            onClick={()=> setMainImage(`http://localhost:5000${img}`)}
                        />
                    ))}
                </div>
            </div>
    );
}

export default ItemImageHandler;