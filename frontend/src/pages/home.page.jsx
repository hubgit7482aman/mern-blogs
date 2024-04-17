import InPageNavigation from "../components/inpage-navigation.component";

const HomePage = () => {
    return (
       
            <section className="h-cover flex justify-center gap-10">
                <div className="w-full">
                    <InPageNavigation routes={["home", "trending blogs"] } />
                        
                       
                </div>
            </section>
        
    )
};

export default HomePage;
