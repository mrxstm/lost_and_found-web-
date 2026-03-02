import ItemsGrid from "./ItemsGrid";

function ReportStateHandler({ loading, error, items }) {
    {/* state handling (loading error success) */}


    // loading
    if (loading) {
        return <div className="text-center text-gray-400 mt-16">Loading your reports....</div>;
    }

    // error
    if (!loading && error) {
        return <div className="text-center text-red-400 mt-16">{error}</div>;
    }

    //success
    if (!loading && !error) {
        return <ItemsGrid items={items} />;
    }

    return null;
}
export default ReportStateHandler;
