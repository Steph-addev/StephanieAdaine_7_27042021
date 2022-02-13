//Import mandatories to run the app
import React, { Fragment, useEffect, useState } from "react";
import axios from "../api/axios";
//Import Components
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import Leftbar from "../components/Leftbar";
import Colleagues from "../components/Colleagues";

function Home() {
  const userId = localStorage.getItem("user");
  const [users, setUsers] = useState([]);

  if (!userId) {
    // Revert back to login if user does not exist in the localStorage
    window.location = "/";
  }

  window.onunload = () => {
    // Clear the local storage on close page
    window.Storage.clear();
  };

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
  }, []);

  const Name = users.map((user) => {
    if (user.id === parseInt(userId)) return user.username;
  });

  return (
    <Fragment>
      <div>
        <Navbar />
        <div className="home-page container-fluid">
          <Leftbar />
          <h1 className="p-4 mb-0 text-center">Bienvenue {Name}</h1>
          <div className="home row">
            <div className="col-9">
              <Feed users={users} />
            </div>
            <div className="Colleagues col-3 pt-3">
              <Colleagues users={users} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
