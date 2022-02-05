import React, { useEffect, useState } from "react";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import Leftbar from "../components/Leftbar";
/* import { AuthContext } from "../context/AuthContext"; */
import axios from "axios";
import Colleagues from "../components/Colleagues";

function Home() {
  /*   const { user } = useContext(AuthContext); */
  const [users, setUsers] = useState([]);

  /*   if (!user) {
    window.location = "/";
  } */

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container"></div>
      <div className="home row">
        <div className="col-1">
          <Leftbar />
        </div>
        <div className="col-8">
          <Feed users={users} />
        </div>
        <div className="Friends col-3">
          <Colleagues users={users} />
        </div>
      </div>
    </div>
  );
}

export default Home;
