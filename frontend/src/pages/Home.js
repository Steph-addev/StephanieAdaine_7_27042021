import React from "react";
import AddPost from "../components/AddPost";
import Navbar from "../components/Navbar";
import NewPost from "../components/NewPost";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="p-3">
          <AddPost />
        </div>
        <div className="p-3">
          <NewPost />
        </div>
      </div>
    </div>
  );
}

export default Home;
