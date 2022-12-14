import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Toolbar,
  Typography,
  AppBar,
} from "@mui/material";
import ErrorSnackbar from "./ErrorSnackbar";
import { useNavigate } from "react-router-dom";

import "../css/Login.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loginFail, setLoginFail] = useState(false);
  const [userType, setUserType] = useState("SHOPPER");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleRegister = async () => {
    if (email && password && firstName && lastName && phone) {
      console.log("URI", process.env.REACT_APP_API_URL);
      console.log();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}user/create`,
        {
          method: "POST",
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password,
            userType: userType,
          }),
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      const success = await response.json();
      if (success != null) {
        window.localStorage.setItem("user", email);
        window.localStorage.setItem("userType", userType);
        console.log(success);
        navigate("/home");
      } else {
        setLoginFail(true);
        setErrorMsg("Registration failed. Try again!");
      }
    } else {
      setErrorMsg("Enter valid input in all the fields.");
      setLoginFail(true);
    }
  };

  const handleEmailInput = (e) => {
    if (/\S+@\S+\.\S+/.test(e.target.value)) {
      setEmail(e.target.value);
    }
  };
  const handlePassInput = (e) => setPassword(e.target.value);
  const handleFirstNameInput = (e) => setFirstName(e.target.value);
  const handleLastNameInput = (e) => setLastName(e.target.value);
  const handlePhoneInput = (e) => setPhone(e.target.value);
  const handleRadio = (e) => setUserType(e.target.value);

  return (
    <div className="login">
      <AppBar>
        <Toolbar style={{ textAlign: "center" }}>
          <Typography
            variant="body1"
            style={{ textAlign: "center", float: "right" }}
            fontSize={30}
          >
            Dev E-Commerce
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="login-card">
        <div className="login-header">Sign Up</div>
        <CardContent className="input-flex">
          <div className="input-group">
            <div className="login-input">
              <TextField
                variant="standard"
                label="First Name"
                onChange={handleFirstNameInput}
              />
            </div>
            <div className="login-input">
              <TextField
                variant="standard"
                label="Last Name"
                onChange={handleLastNameInput}
              />
            </div>
            <div className="login-input">
              <TextField
                variant="standard"
                label="Email"
                onChange={handleEmailInput}
              />
            </div>
            <div className="login-input">
              <TextField
                variant="standard"
                type="password"
                label="Password"
                onChange={handlePassInput}
              />
            </div>
            <div className="login-input">
              <TextField
                variant="standard"
                label="Phone"
                type="number"
                inputProps={{
                  pattern: "[0-9]{10}",
                }}
                onChange={handlePhoneInput}
              />
            </div>
          </div>
          <div className="radio-group">
            <FormControl component="fieldset">
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup
                aria-label="role"
                defaultValue="SHOPPER"
                name="role-radio-buttons"
                onChange={handleRadio}
              >
                <FormControlLabel
                  value="SHOPPER"
                  control={<Radio />}
                  label="Shopper"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </CardContent>
        <CardActions>
          <Button
            className="login-btn"
            variant="contained"
            onClick={handleRegister}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <ErrorSnackbar
        open={loginFail}
        handleClose={() => {
          setLoginFail(false);
          setErrorMsg("");
        }}
        message={errorMsg}
      />
    </div>
  );
};

export default Register;
