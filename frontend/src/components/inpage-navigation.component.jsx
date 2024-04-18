import { useEffect, useRef, useState } from "react";

const InPageNavigation = ({ routes, defaultHidden = [ ], defaultActiveIndex = 0, children }) => {                   // we want that in mediaum screen trending blog not appear right to Home
  let activeTabLineRef = useRef(); // when i will click the button then i will have need of hr(line) so that it can come below to current button
  let activeTabRef = useRef();
   
  // to check which state is active
  let [inPageNavIndex, setInpageNavIndex] = useState(defaultActiveIndex); // i want default index is 0 (only 2 element in the array home,trendingblog)  // jo bhi button active rahegi uske niche line honi chahiye and uska color black hona chahiy

  const changePageState = (btn, i) => {
    let { offsetWidth, offsetLeft } = btn; // offsetwidth will give u width of button, offsetleft will give you how far it is from left

    activeTabLineRef.current.style.width = offsetWidth + "px"; // hr line ki css ko change kar diya
    activeTabLineRef.current.style.left = offsetLeft + "px";

    setInpageNavIndex(i); // upadat index so that color of button can be changed
  };

  // we want by default Home should be active means hr should be by default below home
  useEffect(() => {
    changePageState(activeTabRef.current, defaultActiveIndex);
  },  []);

  return (
    <>
      <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-hidden">
        {/* jo routes ki value hai home, trending blog unpe loop chaleke unko homepage pe render kara rahe hai */}
        {routes.map((route, i) => {
          return (
            <button
              ref={i == defaultActiveIndex ? activeTabRef : null}
              key={i}
              className={
                "p-4 px-5 capitalize" +
                (inPageNavIndex == i ? " text-black " : " text-dark-grey ")
                + ( defaultHidden.includes(route) ? " md:hidden" : " ")
              }
              onClick={(e) => {
                changePageState(e.target, i);
              }}
            >
              {route}
            </button>
          );
        })}
        <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300" />
      </div>
      {
        Array.isArray(children) ? children[inPageNavIndex] : children                  // we will only render that children ,which button we have presed(Home or Trending blogs) // we have checked i children is an array means it will have multiple value so render that children which key pressed 
      }
    </>
  );
};

export default InPageNavigation;
