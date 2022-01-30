import React, { useContext, useEffect, useState } from "react";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import Friends from "../components/Friends";
import Leftbar from "../components/Leftbar";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Home() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + `/users/${user.userId}`);
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  /*   if (!user) {
    window.location = "/";
  } */

  return (
    <div>
      <Navbar />
      <div className="container"></div>
      <div className="home row">
        <div className="col-2">
          <Leftbar />
        </div>
        <div className="col-8">
          <Feed data={userData} />
        </div>
        <div className="Friends col-2">
          <Friends />
        </div>
      </div>
    </div>
  );
}

export default Home;
