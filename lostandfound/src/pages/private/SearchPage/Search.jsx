import Filters from './components/Filters';
import ItemList from './components/ItemList'

function Search() {
    return(
        <div className='min-h-screen flex flex-col bg-[#111827] pb-10 mt-10'>
            <div className='bg-[#1F2937]'>
                <h1 className='text-2xl font-bold text-white mt-12 ml-12 text-2xl'>Search Lost & Found Items</h1>
                <Filters/>
            </div>
            <ItemList/>
        </div>
    );
}

export default Search;