import React, { useContext, useState } from "react";
import { FaImage } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import AddPostPicture from "./AddPostPicture";
import useFetch from "../useFetch";

function AddPost() {
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState("");
  const { refetch } = useFetch(process.env.REACT_APP_SERVER_URL + "/posts");

  const addPicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  //Fonctionne!
  const cancelPost = () => {
    setText("");
    setPostPicture("");
    setFile("");
  };

  const addOnePost = async (e) => {
    e.preventDefault();
    refetch();

    const newPost = {
      UserId: user.userId,
      content: text,
    };

    if (file) {
      let myform = e.target;
      let data = new FormData(myform);
      data.append("image", "image");
      data.append("UserId", user.userId);
      data.append("content", text);
      newPost.images = file;

      axios({
        method: "post",
        url: "http://localhost:5000/posts",
        credentials: true,
        headers: {
          "content-type": "multipart/form-data",
        },
        data: data,
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/posts",
        credentials: true,
        data: {
          UserId: user.userId,
          content: text,
          images: "",
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(file);
    /*     let url = "http://localhost:5000/posts";
    let req = new Request(url, {
      body: data,
      /*       UserId: user.userId,
      content: text, 
      method: "POST",
    });
    fetch(req, newPost)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.warn); */
    /*     if (file) {
      /*      if ((file && file.type === "image/png") || file.type === "image/jpeg" || file.type === "image/jpg");
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("image", file); //renvoi toutes les données de l'image: last update, name, size, type
      data.append("name", fileName);
      newPost.images = fileName;
      console.log(newPost);
      console.log(postPicture);
      console.log(data);
    }
 */
    /*     if (file) {
      const data = new FormData(formElement);
      const request = new XMLHttpRequest();
      request.open("POST", "http://localhost:5000/posts");
      data.append("image", file);
      request.send(new FormData(data));
      console.log(data);
    } */

    /*     axios({
      method: "post",
      url: "http://localhost:5000/posts",
      credentials: true,
      /*       headers: {
        "content-type": "application/x-www-form-urlencoded",
      }, 
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
      }); */
  };

  return (
    <div className="addPost">
      <div className="addPost-box d-flex justify-content-center">
        <div className="addPost-box_publish px-4 py-4">
          <div className="d-flex ">
            <AddPostPicture />
            <p>Exprimez-vous</p>
          </div>
          <form onSubmit={addOnePost} id="addPost-box_form">
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
                <input type="submit" className="button-style button-style_publish" defaultValue="Publier"></input>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
