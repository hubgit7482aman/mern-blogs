import { useEffect, useState } from "react";
import InPageNavigation from "../components/inpage-navigation.component";
import axios from "axios"; // Changed the import statement
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import { activeTabRef } from "../components/inpage-navigation.component";
import NoDataMessage from "../components/nodata.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";
const HomePage = () => {
  let [blogs, setBlog] = useState(null);
  let [trendingBlogs, setTrendingBlogs] = useState(null);
  let [pageState, setPageState] = useState("Home");

  let categories = [
    "programming",
    "hollywood",
    "film making",
    "social media",
    "cooking",
    "calm",
    "finances",
    "travel",
  ];

  // In order to make a request from the server to get the latest blog data
  const fetchLatestBlogs = ({ page = 1 }) => {
    axios
      .post("http://localhost:3000/latest-blogs", { page })
      .then(async ({ data }) => {
        console.log(data.blogs);
        let formatedData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/all-latest-blogs-count",
        });
        
        setBlog(formatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBlogsByCategory = ({ page = 1 }) => {
    axios
      .post("http://localhost:3000/search-blogs", { tag: pageState, page })
      .then(async ({ data }) => {
        let formatedData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blogs-count",
          data_to_send: { tag: pageState },
        });
        setBlog(formatedData); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTrendingBlogs = () => {
    axios
      .get("http://localhost:3000/trending-blogs")
      .then(({ data }) => {
        setTrendingBlogs(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadBlogByCategory = (e) => {
    let category = e.target.innerText.toLowerCase(); // in catogory , it will have a string that which button has pressed from trending tags on home page
    setBlog(null); // whatever latestblog we have it will remove it

    if (pageState == category) {
      // agar koi dobara us button ko click kar dega toh usi page(home) pe vapas aa jana hai
      setPageState("Home");
      return;
    }
    setPageState(category);
  };

  useEffect(() => {
    activeTabRef.current.click(); // jab bhi pagestate change hogi by clicking on tags on trending div then we have updata hr according to that tag ( it is happening when i click that hr, that is why we have used that reference from inpage-component and clicking that button)
    if (pageState == "Home") {
      fetchLatestBlogs({ page: 1 });
    } else {
      fetchBlogsByCategory({ page: 1});
    }

    if (!trendingBlogs) {
      fetchTrendingBlogs();
    }
  }, [pageState]);

  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <InPageNavigation
          routes={[pageState, "Trending Blogs"]}
          defaultHidden={["Trending Blogs"]}
        >
          <>
          {blogs == null ? (
  <Loader />
) : (
  blogs.results && blogs.results.length ? 
  blogs.results.map((blog, i) => {
    return (
      <BlogPostCard
        content={blog}
        author={blog.author.personal_info}
        key={i} // Don't forget to add a unique key when rendering a list of components
      />
    );
  })
  :
  <NoDataMessage message="No blogs published" />
)}

            <LoadMoreDataBtn state={blogs} fetchDataFun={( pageState == "Home" ? fetchLatestBlogs : fetchBlogsByCategory )} />
          </>

          {trendingBlogs == null ? (
            <Loader />
          ) : (
          trendingBlogs.length ? 
            trendingBlogs.map((blog, i) => {
              return (<MinimalBlogPost blog={blog} index={i} />);
            })
           : 
            <NoDataMessage message="No trending blogs" />
          )}
        </InPageNavigation>
      </div>

      <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="font-medium text-xl mb-8">
              Stories from all interests{" "}
            </h1>
            <div className="flex gap-3 flex-wrap">
              {categories.map((category, i) => {
                return (
                  <button
                    onClick={loadBlogByCategory}
                    className={
                      "tag " +
                      (pageState == category ? "bg-black text-white " : "")
                    }
                    key={i}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <h1 className="font-medium text-xl mb-8">
              Trending <i class="fi fi-bs-arrow-trend-up"></i>
            </h1>
            {trendingBlogs == null ? (
              <Loader />
            ) : (
              trendingBlogs.length ? 
              trendingBlogs.map((blog, i) => {
                return (<MinimalBlogPost blog={blog} index={i} />);
              })
             : 
              <NoDataMessage message="No trending blogs" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
