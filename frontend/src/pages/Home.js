import React, { useEffect /* useState */ } from "react";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import axios from "axios";
import Friends from "../components/Friends";
import Leftbar from "../components/Leftbar";

function Home() {
  /*   const [users, setUsers] = useState({}); */

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`http://localhost:5000/users`);
      console.log(res);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container"></div>
      <div className="home row">
        <div className="col-4">
          <Leftbar />
        </div>
        <div className="col-4">
          <Feed />
        </div>
        <div className="Friends col-4">
          <Friends />
        </div>
      </div>
    </div>
  );
}

export default Home;
