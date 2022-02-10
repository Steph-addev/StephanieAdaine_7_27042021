import React, { useEffect, useState, useContext } from "react";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import Leftbar from "../components/Leftbar";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";
import Colleagues from "../components/Colleagues";

function Home() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  if (!user) {
    window.location = "/";
  }

  useEffect(() => {
    const fetchUsers = () => {
      axios
        .get("/users", {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUsers();
    /*     const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers(); */
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <h1 className="p-4">Mon fil d'actualités</h1>
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
    </div>
  );
}

export default Home;
