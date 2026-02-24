import locationimg from '../assets/images/location.png';
import calendar from '../assets/images/dates.png';
import { Link } from 'react-router-dom';

function ProductCard({id, item_name, image, location, date, fromPage, status}) {

       const colors = {
            lost: { bg: 'bg-red-500', text: 'text-white' },
            found: { bg: 'bg-green-400', text: 'text-black' },
        };
    
        const { bg, text } = colors[status] || { bg: 'bg-gray-500', text: 'text-white' };

    return (
        <Link to={`/item/${id}`} state={{from: fromPage}}> 
            <div className="bg-[#1F2937] h-[480px] w-[380px] rounded-xl shadow-sm cursor-pointer relative">

               {fromPage == "search" && (
                <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold ${bg} ${text} z-10`}
                >
                    {status}
                </div>
                )}

                <img 
                    src={image} 
                    alt={item_name} 
                    className="h-[250px] w-full object-cover object-center rounded-t-xl"
                />
                <h1 className="mt-4 ml-4 text-white font-semibold">{item_name}</h1>
                <p className='mt-2 ml-5 text-[#D1D5DB] flex items-center gap-2 text-sm'> <img src={locationimg} alt="" className='size-3.5'/> {location} </p>
                <p className='mt-2 ml-5 text-[#D1D5DB] flex items-center gap-2 text-sm'> <img src={calendar} alt="" className='size-3.5'/> {date} </p>
                <button className='bg-[#5DCEA6] w-[90%] ml-4 mt-4 h-10 rounded-xl text-black'>View Details</button>

            </div>
        </Link>
    );
}

export default ProductCard;