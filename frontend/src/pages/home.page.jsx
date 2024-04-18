import { useEffect, useState } from "react";
import InPageNavigation from "../components/inpage-navigation.component";
import axios from "axios"; // Changed the import statement
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";

const HomePage = () => {
  let [blogs, setBlog] = useState(null);

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

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <InPageNavigation
          routes={["Home", "Trending Blogs"]}
          defaultHidden={["Trending Blogs"]}
        >
          <>{blogs == null ? <Loader /> :
          blogs.map((blog, i) => {
            return <BlogPostCard content={blog} author={blog.author.personal_info} />
          })
          }</>
        
        </InPageNavigation>
      </div>
    </section>
  );
};

export default HomePage;
