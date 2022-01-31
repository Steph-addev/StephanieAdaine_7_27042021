import React, { useContext, useEffect } from "react";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import Leftbar from "../components/Leftbar";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Colleagues from "../components/Colleagues";

function Home() {
  const { user } = useContext(AuthContext);

  /*   if (!user) {
    window.location = "/";
  } */

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + `/users/${user.userId}`);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

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
          <Colleagues />
        </div>
      </div>
    </div>
  );
}

export default Home;
