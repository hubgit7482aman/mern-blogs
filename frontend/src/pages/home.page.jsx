import { useEffect, useState } from "react";
import InPageNavigation from "../components/inpage-navigation.component";
import axios from "axios"; // Changed the import statement
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";

const HomePage = () => {
  let [blogs, setBlog] = useState(null);
  let [trendingBlogs, setTrendingBlogs] = useState(null);

  let categories = [
    "programming",
    "hollywood",
    "film making",
    "social media",
    "cooking",
    "tech",
    "finances",
    "travel",
  ];

  // In order to make a request from the server to get the latest blog data
  const fetchLatestBlogs = () => {
    axios
      .get("http://localhost:3000/latest-blogs")
      .then(({ data }) => {
        setBlog(data.blogs);
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

     let category = e.target.innerText.toLowerCase();          // in catogory , it will have a string that which button has pressed from trending tags on home page
     
 }


  useEffect(() => {
    fetchLatestBlogs();
    fetchTrendingBlogs();
  }, []);

  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <InPageNavigation
          routes={["Home", "Trending Blogs"]}
          defaultHidden={["Trending Blogs"]}
        >
          <>
            {blogs == null ? (
              <Loader />
            ) : (
              blogs.map((blog, i) => {
                return (
                  <BlogPostCard
                    content={blog}
                    author={blog.author.personal_info}
                  />
                );
              })
            )}
          </>

          {trendingBlogs == null ? (
            <Loader />
          ) : (
            trendingBlogs.map((blog, i) => {
              return <MinimalBlogPost blog={blog} index={i} />;
            })
          )}
        </InPageNavigation>
      </div>

      <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
        <div className="flex flex-col gap-10">
          <div>
            <h1 className="font-medium text-xl mb-8">Stories from all interests </h1>
            <div className="flex gap-3 flex-wrap">

              {categories.map((category, i) => {
                return (
                  <button onClick={loadBlogByCategory} className="tag" key={i}>
                    {category}
                  </button>
                )
              })}
            </div>
        </div>
        <div>
          <h1 className="font-medium text-xl mb-8">
            Trending <i class="fi fi-bs-arrow-trend-up"></i>
          </h1>
          {trendingBlogs == null ? (
            <Loader />
          ) : 
          (trendingBlogs.map((blog, i) => {
              return <MinimalBlogPost blog={blog} index={i} />;
            })
          )}
        </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
