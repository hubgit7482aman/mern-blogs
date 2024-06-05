import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Navigate, useParams } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";
import Loader from "../components/loader.component";
import axios from "axios";

const blogStructure = {
  // this is blog structure object
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: "",
  author: { personal_info: {} },
};

export const EditorContext = createContext({}); // react tool allows you to share the data between the components

const Editor = () => {

  let { blog_id } = useParams();  

  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState("editor");
  const [ textEditor, setTextEditor ] =useState({ isReady: false});
  const [ loading, setLoading ] = useState(true);
  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  useEffect(() => {
    if(!blog_id){
       return setLoading(false);
    }

    axios.post("http://localhost:3000/get-blog",{
      blog_id, draft: true, mode: 'edit'
    })
    .then(( { data: { blog }} ) => {
        setBlog(blog);
        setLoading(false);
    })
    .catch(err => {
       setBlog(null);
       setLoading(false);
    })
  }, [])
  return (
    // you can access these four values from blogeditor and publish form
    <EditorContext.Provider
      value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor }}
    >
      {
        // we will check if user has logged in then only he can write in editor
        access_token == null ? (
          <Navigate to="/signin" />
        ) : 
        loading ? <Loader /> :
        editorState == "editor" ? (
          <BlogEditor />
        ) : (
          <PublishForm />
        )
      }
    </EditorContext.Provider>
  );
};

export default Editor;
