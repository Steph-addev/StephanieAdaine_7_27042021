import React, { Fragment, useEffect, useState } from "react";
import AddPost from "./AddPost";
import NewPost from "./NewPost";
import axios from "axios";
import useFetch from "../useFetch";

function Feed({ users }) {
  const [newPost, setNewPost] = useState([]);
  const { loading, error, refetch } = useFetch(process.env.REACT_APP_SERVER_URL + "/posts");

  if (error) console.log(error);

  newPost.sort((param1, param2) => {
    return new Date(param2.createdAt) - new Date(param1.createdAt);
  });

  //TODO: Try to find the good loop to charge and stop the loading
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
    <Fragment>
      {loading ? (
        <h1>Loading datas...</h1>
      ) : (
        <div className="feed">
          <div className="feed-box p-3">
            <AddPost />
            <button onClick={refetch}>Actualiser mon feed</button>
            {newPost.map((param) => (
              <NewPost key={param.id} postData={param} users={users} />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Feed;
