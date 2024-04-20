import { useParams } from "react-router-dom";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import NoDataMessage from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import axios from "axios";
import { filterPaginationData } from "../common/filter-pagination-data";
const SearchPage = () => {
  let { query } = useParams();
  let [ blogs, setBlog ] = useState(null);
 
  const searchBlogs = ({ page = 1, create_new_arr = false }) => {
    axios.post("http://localhost:3000/search-blogs", { query, page })
    .then(async ({ data }) => {
        console.log(data.blogs);
        let formatedData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blogs-count",
          data_to_send: { query },
          create_new_arr
        });
        
        setBlog(formatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    resetState();
    searchBlogs({ page: 1, create_new_arr: true});
  }, [query])

   const resetState = () => {
    setBlog(null);
   }
  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <InPageNavigation
          routes={[`Search Results from "${query}"`, "Accounts Matched"]}
          defaultHidden={["Accounts Matched"]}
        >
          <>
            {blogs == null ? (
              <Loader />
            ) : blogs.results && blogs.results.length ? (
              blogs.results.map((blog, i) => {
                return (
                  <BlogPostCard
                    content={blog}
                    author={blog.author.personal_info}
                    key={i} // Don't forget to add a unique key when rendering a list of components
                  />
                );
              })
            ) : (
              <NoDataMessage message="No blogs published" />
            )}

            <LoadMoreDataBtn
              state={blogs}
              fetchDataFun={searchBlogs}
            />
          </>
        </InPageNavigation>
      </div>
    </section>
  );
};

export default SearchPage;
