import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import NewPost from "./NewPost";
import axios from "axios";

function Feed() {
  const [newPost, setNewPost] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const postResults = await axios.get(`http://localhost:5000/posts`);
      setNewPost(postResults.data);
      setUser(postResults.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feed-box p-3">
        <AddPost props={user} />
        {newPost.map((param) => (
          <NewPost key={param.id} post={param} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
