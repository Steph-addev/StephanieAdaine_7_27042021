import React, { useContext, useState } from "react";
import { FaImage } from "react-icons/fa";

import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import AddPostPicture from "./AddPostPicture";

function AddPost() {
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState(null);
  const [post, setPost] = useState([]);

  // La fonction addPicture fonctionne très bien car le lien de l'image côté front est renvoyé via "postPicture" = http://localhost:3000/référence de l'image(ID)
  const addPicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  /* 
  const sendPost = async (e) => {
    if (text || postPicture) {
      const data = new FormData();
      data.append("UserId", user.userId);
      data.append("content", text);
      if (file) data.append("image", file);
    }
  }; */

  //Fonctionne!
  const cancelPost = () => {
    setText("");
    setPostPicture("");
    setFile("");
  };

  console.log("file:");
  console.log(file);

  const addOnePost = async (e) => {
    e.preventDefault();

    //newPost renvoi l'userId, le contenu et l'image sous format data+nom.extension
    const newPost = {
      UserId: user.userId,
      content: text,
    };

    if (file) {
      if ((file && file.type === "image/png") || file.type === "image/jpeg" || file.type === "image/jpg");
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("image", file); //renvoi toutes les données de l'image: last update, name, size, type
      data.append("name", fileName);
      newPost.images = fileName;
      console.log(newPost);
      console.log(postPicture);
    }
    axios({
      method: "post",
      url: "http://localhost:5000/posts",
      credentials: true,
      data: {
        UserId: user.userId,
        content: text,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="addPost">
      <div className="addPost-box d-flex justify-content-center">
        <div className="addPost-box_publish px-4 py-4">
          <div className="d-flex ">
            <AddPostPicture />
            <p>Exprimez-vous</p>
          </div>
          <form onSubmit={addOnePost} /* method="post" action={`http://localhost:5000/posts`} */ encType="multipart/form-data">
            <div className="row">
              <textarea className="addPost-box_publish--content" type="text" placeholder="Votre message ici" className="my-3" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            </div>
            <div className="row">{postPicture ? <img src={postPicture} alt="" className="addPost-box_publish--image" /> : null}</div>
            <div className="row">
              <label htmlFor="file" className="d-flex justify-content-around addPost-box_publish--imageBtn">
                <FaImage />
                <input type="file" className="button-style button-style_image" name="image" accept=".jpg, .png, .gif" onChange={(e) => addPicture(e)}></input>
                {postPicture ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}
                <input type="submit" className="button-style button-style_publish" defaultValue="Publier" /*  onSubmit={sendPost} */></input>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
