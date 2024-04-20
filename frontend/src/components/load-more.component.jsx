const LoadMoreDataBtn = ({ state, fetchDataFun }) => {
    if (state && state.page !== undefined && state.totalDocs > state.results.length) {
      return (
        <button 
          onClick={() => fetchDataFun({ page: state.page + 1 })}
          className="text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2"
        >
          Load More
        </button>
      );
    } else {
      return null; // Return null if the conditions are not met to render nothing
    }
  };
  
  export default LoadMoreDataBtn;
  