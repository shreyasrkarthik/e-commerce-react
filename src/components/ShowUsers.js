import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";

const ShowUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const home = () => {
    navigate("/home");
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}user`)
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  return (
    <div className="home">
      <AppBar>
        <Toolbar>
          <Typography variant="body1">E-Commerce website</Typography>
          <div className="right-action-btns">
            <IconButton className="action-btn" onClick={home}>
              <Home />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className="catalogue">
        {users.length > 0 ? (
          users.map((user) => (
            <UserDetails
              firstName={user.firstName}
              lastName={user.lastName}
              userType={user.userType}
              email={user.email}
              image={user.image}
            />
          ))
        ) : (
          <div>Loading products</div>
        )}
      </div>
    </div>
  );
};

export default ShowUsers;
