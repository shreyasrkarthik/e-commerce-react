import "../css/Profile.css";

import {
  Alert,
  AppBar,
  Box,
  Button,
  IconButton,
  Slide,
  Snackbar,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { Home, Logout } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState(null);

  const [address, setAddress] = useState({
    country: "United States of America",
    state: "Massachusetts",
    city: "Boston",
    street: "Huntington Ave",
    zipcode: "02120",
  });
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const [password, setPassword] = useState("");
  const userEmailId = window.localStorage.getItem("user");
  console.log("REACT email", userEmailId);

  const firstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const lastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const phoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const setCountry = (e) => {
    const newCountry = e.target.value;
    const newAddress = {
      ...address,
      country: newCountry,
    };
    setAddress(newAddress);
  };

  const setState = (e) => {
    const newState = e.target.value;
    const newAddress = {
      ...address,
      state: newState,
    };
    setAddress(newAddress);
  };

  const setStreet = (e) => {
    const newStreet = e.target.value;
    const newAddress = {
      ...address,
      street: newStreet,
    };
    setAddress(newAddress);
  };

  const setCity = (e) => {
    const newCity = e.target.value;
    const newAddress = {
      ...address,
      city: newCity,
    };
    setAddress(newAddress);
  };

  const setZipCode = (e) => {
    const newZipCode = e.target.value;
    const newAddress = {
      ...address,
      zipcode: newZipCode,
    };
    setAddress(newAddress);
  };
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}user/email/${window.localStorage.getItem(
        "user"
      )}`
    )
      .then((res) =>
        res.json().then((data) => {
          console.log("Data form Backend", data);
          setUser(data);
          setFirstName(data["user"]["firstName"]);
          setLastName(data["user"]["lastName"]);
          setEmail(data["user"]["email"]);
          setPhoneNumber(data["user"]["phone"]);
          setPassword(data["user"]["password"]);
        })
      )
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  console.log("UserData", user);

  const saveUserDetails = async () => {
    console.log("Trying to save data to user");
    console.log(user);
    setOpen(true);
    let res = await fetch(
      `${process.env.REACT_APP_API_URL}user/${user["user"]["_id"]}`,
      {
        method: "PUT",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phoneNumber,
          password: password,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    let data = await res.json();
    console.log("After Saving user details to Mongo", data);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleClickHome = () => {
    navigate("/home");
  };
  const logout = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("userType");
    navigate("/home");
  };

  return (
    <div className="profile">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            {window.localStorage.getItem("userType") === "admin" && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Admin
              </Typography>
            )}

            {window.localStorage.getItem("userType") === "shopper" && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Shopper
              </Typography>
            )}

            {window.localStorage.getItem("userType") === "staff" && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Staff
              </Typography>
            )}

            <div>
              <Tooltip title={"Home"}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  color="inherit"
                  onClick={handleClickHome}
                >
                  <Home />
                </IconButton>
              </Tooltip>

              <Tooltip title={"Logout"}>
                <IconButton className="action-btn" onClick={logout}>
                  <Logout />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        sx={{
          display: "flex",
          "& > *": {
            m: 1,
          },
        }}
      ></Box>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          marginTop: "3%",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={firstNameChange}
        />
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={lastNameChange}
        />
      </Box>
      <Box
        component="form"
        sx={{
          width: 460,
          maxWidth: "100%",
          marginLeft: "35%",
          marginTop: "2%",
        }}
      >
        <TextField
          fullWidth
          label="Email"
          id="fullWidth"
          value={email}
          onChange={emailChange}
        />
      </Box>
      <Box
        component="form"
        sx={{
          width: 460,
          maxWidth: "100%",
          marginLeft: "35%",
          marginTop: "2%",
        }}
        mt={1}
      >
        <TextField
          fullWidth
          label="Phone Number"
          id="fullWidth"
          value={phoneNumber}
          onChange={phoneNumberChange}
        />
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          marginTop: "2%",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Country"
          variant="outlined"
          value={address.country}
          onChange={(event) => setCountry(event)}
        />
        <TextField
          id="outlined-basic"
          label="State"
          variant="outlined"
          value={address.state}
          onChange={(event) => setState(event)}
        />
      </Box>
      <Box
        component="form"
        sx={{
          width: 460,
          maxWidth: "100%",
          marginLeft: "35%",
          marginTop: "2%",
        }}
        mt={1}
      >
        <TextField
          fullWidth
          label="Street"
          id="fullWidth"
          value={address.street}
          onChange={(event) => setStreet(event)}
        />
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          marginTop: "2%",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="City"
          variant="outlined"
          value={address.city}
          onChange={(event) => setCity(event)}
        />
        <TextField
          id="outlined-basic"
          label="Zipcode"
          variant="outlined"
          value={address.zipcode}
          onChange={(event) => setZipCode(event)}
        />
      </Box>
      <Box
        component="form"
        sx={{
          width: 460,
          maxWidth: "100%",
          marginLeft: "35%",
          marginTop: "2%",
        }}
        mt={1}
      >
        <TextField
          fullWidth
          label="Password"
          id="fullWidth"
          value={password}
          onChange={passwordChange}
        />
      </Box>
      <Button
        padding={10}
        variant="contained"
        size="large"
        onClick={saveUserDetails}
      >
        Save
      </Button>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          autoHideDuration={2000}
          TransitionComponent={Slide}
        >
          Your changes have been saved!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
