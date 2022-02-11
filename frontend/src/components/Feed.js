// Import mandatories to run the app
import React, { Fragment, useEffect, useState } from "react";
import axios from "../api/axios";
// Import Components
import AddPost from "./AddPost";
import NewPost from "./NewPost";
//Import front visuals
import Spinner from "react-bootstrap/Spinner";

function Feed({ users }) {
  const [newPost, setNewPost] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (error) console.log(error);

  newPost.sort((param1, param2) => {
    return new Date(param2.createdAt) - new Date(param1.createdAt);
  });

  useEffect(() => {
    const fetchPosts = () => {
      axios
        .get("/posts", {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setNewPost(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchPosts();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <div className="feed-spinner">
          <Spinner animation="border" variant="danger" />
          <p>Récupération des données en cours...</p>
        </div>
      ) : (
        <div className="feed">
          <div className="feed-box p-3">
            <AddPost users={users} />
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
