import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {FaPen} from "react-icons/fa";

function DeletePost() {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [test, setText] = useState("false");
  const { user } = useContext(AuthContext);

  const modifyPost = (e) =>{

  }

  useEffect(() =>{
const verifyAuth =() => {
    if (user == Comments.comment.id){
        setIsAuthor(true);
    }
}
  })

  const modifyPost

  return <div className="modify-comment">
      {isAuthor && edit == false && (
          <span onClick={() => setEdit(!edit)}>
              <FaPen/>
          </span>
      )}
  </div>;
}

export default DeletePost;
