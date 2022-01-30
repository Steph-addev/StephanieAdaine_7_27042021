import React, { useContext, useEffect, useState } from "react";
import AddPost from "./AddPost";
import NewPost from "./NewPost";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Feed({ data }) {
  const [newPost, setNewPost] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/posts");
        setNewPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feed-box p-3">
        <AddPost userImage={data} />
        {newPost.map((param) => (
          <NewPost key={param.id} post={param} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
