import React, { useEffect /* useState */ } from "react";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import Friends from "../components/Friends";
import Leftbar from "../components/Leftbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="container"></div>
      <div className="home row">
        <div className="col-2">
          <Leftbar />
        </div>
        <div className="col-8">
          <Feed />
        </div>
        <div className="Friends col-2">
          <Friends />
        </div>
      </div>
    </div>
  );
}

export default Home;
