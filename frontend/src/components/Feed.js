import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import NewPost from "./NewPost";
import axios from "axios";

function Feed() {
  const [newPost, setNewPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:5000/posts/`);
      console.log(res);
      setNewPost(res.data);
      console.log(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feed-box p-3">
        <AddPost />
        {newPost.map((param) => (
          <NewPost key={param.id} post={param} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
