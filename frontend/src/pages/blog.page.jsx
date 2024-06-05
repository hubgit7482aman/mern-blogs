import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/loader.component";
import { getDay } from "../common/date";
import BlogInteraction from "../components/blog-interaction.component";
import BlogPostCard from "../components/blog-post.component";
<<<<<<< HEAD
import BlogContent from "../components/blog-content.component";
=======
>>>>>>> c213172a68b1d5cefef852094f4f765e28be619c

export const blogStructure = {
    title: '',
    des: '',
    content: [],
    author: { personal_info: { } },
    banner: '',
    publishedAt: '',
}

export const Blogcontext = createContext({ });
const BlogPage = () => {
   // firstly access the blog id then acces the actual data from database

    let { blog_id } = useParams();
    let [ blog, setBlog ] = useState(blogStructure);
    let [ similarBlogs, setSimilarBlogs ] = useState(null);
    let [loading, setLoading ] = useState(true);
<<<<<<< HEAD
    let [ islikedByUser, setLikedByUser ] = useState(false);
    let { title, content, banner, author: { personal_info: { fullname, username: author_username, profile_img } }, publishedAt } = blog;
    
    const fetchBlog = () => {

       
        axios.post("http://localhost:3000/get-blog", { blog_id
        }).then(( { data: { blog } }) => {

            setBlog(blog);
=======

    let { title, content, banner, author: { personal_info: { fullname, username: author_username, profile_img } }, publishedAt } = blog;
    
    const fetchBlog = () => {
        axios.post("http://localhost:3000/get-blog", { blog_id
        }).then(( { data: { blog } }) => {
>>>>>>> c213172a68b1d5cefef852094f4f765e28be619c
            axios.post("http://localhost:3000/search-blogs", { tag: blog.tags[0], limit: 6, eleminate_blog: blog_id})
            .then(({ data }) => {
                setSimilarBlogs(data.blogs);
            })
            
<<<<<<< HEAD
            
=======
            setBlog(blog);
>>>>>>> c213172a68b1d5cefef852094f4f765e28be619c
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }

    useEffect(() => {
        resetStates();
        fetchBlog();
    }, [blog_id])

    const resetStates = () => {
        setBlog(blogStructure);
        setSimilarBlogs(null);
        setLoading(true);
    }
    return (
       <>
        {
            loading ? <Loader />
            :
<<<<<<< HEAD
            <Blogcontext.Provider value={{ blog, setBlog, islikedByUser, setLikedByUser }}>
=======
            <Blogcontext.Provider value={{ blog, setBlog }}>
>>>>>>> c213172a68b1d5cefef852094f4f765e28be619c
            <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
                    <img src={banner} className="aspect-video" />
                    <div className="mt-12">
                         <h2>{title}</h2>
                         <div className="flex max-sm:flex-col justify-between my-8">
                            <div className="flex gap-5 items-start">
                                <img src={profile_img} className="w-12 h-12 rounded-full" />
                                <p className="capitalize">
                                    {fullname}
                                     <br />
                                     @
                                     <Link to={`/user/${author_username}`}
                                     className="underline"
                                     >{author_username}</Link>
                                </p>
                            </div>
                            <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">Published on {getDay(publishedAt)}</p>
                         </div>
                    </div>

                    <BlogInteraction />
<<<<<<< HEAD

                    <div className="my-12 font-gelasio blog-page-content">
                        {
                            content[0].blocks.map((block, i) => {
                                return <div key={i} className="my-4 md:my-8">
                                    <BlogContent block={block} />
                                    </div>
                            })
                        }

                    </div>
=======
>>>>>>> c213172a68b1d5cefef852094f4f765e28be619c
                    <BlogInteraction />
                    {
                        similarBlogs != null && similarBlogs.length ?
                        <>
                            <h1 className="text-2xl mt-14 mb-10 font-medium"></h1>
                            {
                                similarBlogs.map((blog, i) => {
                                    let { author: { personal_info }} =blog;
                                    return <BlogPostCard content={blog} author={personal_info} />
                                })
                            }
                        </>
                        : " "
                    }
            </div>
            </Blogcontext.Provider>
        }
       </>
    )
}
export default BlogPage;