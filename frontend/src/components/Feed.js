import React, { Fragment, useEffect, useState } from "react";
import AddPost from "./AddPost";
import NewPost from "./NewPost";
import axios from "../api/axios";

import Spinner from "react-bootstrap/Spinner";

function Feed({ users }) {
  const [newPost, setNewPost] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  if (error) console.log(error);

  newPost.sort((param1, param2) => {
    return new Date(param2.createdAt) - new Date(param1.createdAt);
  });

  //TODO: Try to find the good loop to charge and stop the loading
  useEffect(() => {
    /*     if(isUpdated, setIsUpdated){
      const fetchPosts = async () => {
        try {
          const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/posts");
          setNewPost(res.data);
        } catch (err) {
          console.log(err);
        }
        return 
      };
      fetchPosts();
    } */
    /*     const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts", {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        });
        setNewPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts(); */
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
            <button>Actualiser mon feed</button>
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
