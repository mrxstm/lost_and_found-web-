import HeroSection from "./components/HeroSection";
import StatCardSection from "./components/StatCardSection";
import RecentLostItems from "./components/RecentLostItems";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";




function Home({openSignup}) {
    return(
        <div>
            <HeroSection/>
            <StatCardSection/>
            <RecentLostItems/>
            <HowItWorks/>
            <Footer
                openSignup={openSignup}
            />
        </div>
    );
} 

export default Home;