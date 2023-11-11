import { createContext, useState } from "react";

export const PostDetailsContext = createContext(null)

function Post ({children}) {

    const [PostDetails,setPostDetails]=useState()
    return(
        <PostDetailsContext.Provider value={{PostDetails,setPostDetails}}>
            {children}
        </PostDetailsContext.Provider>
    )
}

export default Post;