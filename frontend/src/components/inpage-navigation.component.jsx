import { useRef, useState } from "react";

const InPageNavigation = ({ routes }) => {

    let activeTabLineRef = useRef();   // when i will click the button then i will have need of hr(line) so that it can come below to current button
      
    // to check which state is active
    let [ inPageNavIndex, setInpageNavIndex ] = useState(0);  // i want default index is 0 (only 2 element in the array home,trendingblog)  // jo bhi button active rahegi uske niche line honi chahiye and uska color black hona chahiy

    
    return(
        <>
              <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-hidden">
                
                {/* jo routes ki value hai home, trending blog unpe loop chaleke unko homepage pe render kara rahe hai */}
                {
                    routes.map((route, i) => {
                        return (
                            <button key={i}
                             className={"p-4 px-5 capitalize" + ( inPageNavIndex == i ? "text-black" : "text-dark-grey")}
                             onClick={(e) => { changePageState(e.target, i)}}
                             >
                               { route }
                            </button>
                        )
                    })
                }
                <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300" />
              </div>

        </>
    )
}

export default InPageNavigation;