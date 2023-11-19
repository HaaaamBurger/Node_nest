import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users")
      .then(({data}) => setUsers(data))
  }, []);

  console.log(users);

  return (
    <div>
      {
        users.map(user => <div>{user.email}</div>)
      }
    </div>
  );
};

export default App;