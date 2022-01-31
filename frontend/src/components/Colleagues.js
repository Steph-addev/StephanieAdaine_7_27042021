import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// A FAIRE SI LE TEMPS LE PERMET SINON ON LAISSE TOMBER

function Colleagues() {
  /*   const { user } = useContext(AuthContext); */

  /*   const [users, setUsers] = useState({}); */

  /*   useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`http://localhost:5000/users`);
      console.log(res);
    };
    fetchUsers();
  }, []); */

  return (
    <div className="friends">
      <div className="friends-list">
        {/*       {listColleagues.map((param) => (
          <NewPost key={param.id} post={param} />
        ))} */}
        <ul>
          <li>Username</li>
        </ul>
      </div>
    </div>
  );
}

export default Colleagues;
