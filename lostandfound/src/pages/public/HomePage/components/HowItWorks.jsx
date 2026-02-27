import StatCard from './StatCard'
import report from '../../../../assets/images/medical-report.png'
import searchorg from '../../../../assets/images/searchorg.png'
import verify from '../../../../assets/images/verified-user.png'

function HowItWorks() {
    return (
        <div className='w-full flex flex-col justify-center items-center bg-[#1F2937] py-5 px-4 sm:px-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-white mt-4 mb-6'>How It Works</h1>

            <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-6 pb-8'>
                <StatCard
                    page='howitworks'
                    icon={report}
                    info="Report Item"
                    label="Create a detailed report with photos and descriptions of your lost or found item"
                    color="#374151"
                />
                <StatCard
                    page='howitworks'
                    icon={searchorg}
                    info="Search & Match"
                    label="Browse through reports and find matches using our smart search filters"
                    color="#5DCEA6"
                />
                <StatCard
                    page='howitworks'
                    icon={verify}
                    info="Verify & Claim"
                    label="Submit verification details and safely claim your lost item"
                    color="#374151"
                />
            </div>
        </div>
    );
}

export default HowItWorks;