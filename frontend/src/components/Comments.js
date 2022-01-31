import React, { useState, useEffect, Fragment } from "react";
/*import { AuthContext } from "../context/AuthContext"; */
import AddComment from "./AddComments";
import NewComment from "./NewComment";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

function Comments({ post, userInfo }) {
  const [newComment, setNewComment] = useState([]);
  const [textUpdate, setTextUpdate] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [keyComment, setKeyComment] = useState({});

  const dataUpdate = {
    UserId: post.UserId,
    uuid: post.uuid,
    content: textUpdate,
  };

  const updatePost = async () => {
    if (textUpdate) {
      axios
        .put(`http://localhost:5000/posts/comment-update/${post.id}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deletePost = async () => {
    axios
      .delete(`http://localhost:5000/posts/comment-delete/${post.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + `/posts/comment-display/${post.id}`);
        setNewComment(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, []);

  return (
    <Fragment>
      <div className="comments">
        <div className="comments-box">
          {newComment.map((dataComment) => (
            <div>
              <NewComment key={dataComment.id} comment={dataComment} userInfo={userInfo} postId={post.id} />
              {isUpdated === false && <p>Content</p>}
              {isUpdated && (
                <div className="comments-box_update">
                  <textarea defaultValue="{post.content}" onChange={(e) => setTextUpdate(e.target.value)} />
                  <div className="comments-box_update--button-container">
                    <button type="submit" className="comments-box_update--btn" onClick={updatePost}>
                      Valider les modifications
                    </button>
                  </div>
                </div>
              )}
              {userInfo.id === post.UserId && (
                <div>
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <FaPencilAlt />
                  </div>
                  <div
                    onClick={() => {
                      if (window.confirm("Voulez-vous supprimer votre publication?")) deletePost();
                    }}
                  >
                    <FaTrashAlt />
                  </div>
                </div>
              )}
            </div>
          ))}
          <AddComment postId={post.id} userInfo={userInfo.id} />
        </div>
      </div>
    </Fragment>
  );
}

export default Comments;
