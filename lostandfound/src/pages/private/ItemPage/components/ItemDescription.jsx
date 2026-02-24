import ItemImageHandler from "./ItemImageHandler";
import ItemInfo from "./ItemInfo";

function ItemDescription({itemData}) {
    return(
        <div className="bg-[#1F2937] min-h-screen px-10 py-10 pb-40 rounded-2xl flex flex-col flex-1">
            <ItemImageHandler
                itemImage = {itemData?.image_urls}
            />
            <ItemInfo
                item={itemData}
            />
        </div>
    );
}

export default ItemDescription;