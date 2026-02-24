import ProductCard from '../../../../components/ProductCard'
import arrow from '../../../../assets/images/right-arrow.png'
import {Link} from 'react-router-dom'
function RecentLostItems() {
    return(
        <div className='bg-[#111827] flex flex-col h-[750px]'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold text-white ml-14 mt-16 text-2xl'>Recently Lost Items</h1>
                <div className='flex items-center gap-2 mr-10 cursor-pointer'>
                    <Link to="/search">
                        <h3 className='text-[#5DCEA6] font-semibold'>View all</h3>
                    </Link>
                    <img src={arrow} alt="" className='size-4'/>
                </div>
            </div>
            <div className="mt-14 ml-20 grid grid-cols-3 gap-y-20"> 
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
        </div>
    );
}

export default RecentLostItems;