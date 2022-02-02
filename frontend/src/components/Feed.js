import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import NewPost from "./NewPost";
import axios from "axios";

function Feed({ users }) {
  const [newPost, setNewPost] = useState([]);

  newPost.sort((param1, param2) => {
    return new Date(param2.createdAt) - new Date(param1.createdAt);
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/posts");
        setNewPost(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feed-box p-3">
        <AddPost userData={users} />
        {newPost.map((param) => (
          <NewPost key={param.id} post={param} users={users} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
