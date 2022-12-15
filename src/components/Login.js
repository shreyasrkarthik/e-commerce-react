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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFail, setLoginFail] = useState(false);
  const [userType, setUserType] = useState("shopper");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (email && password) {
      console.log("URI", process.env.REACT_APP_API_URL);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}user/login`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            userType,
          }),
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      const { success } = await response.json();
      if (success) {
        window.localStorage.setItem("user", email);
        window.localStorage.setItem("userType", userType);
        navigate("/home");
      } else {
        setLoginFail(true);
        setErrorMsg("Username or password incorrect");
      }
    } else {
      setErrorMsg("Username or password incorrect");
      setLoginFail(true);
    }
  };

  const handleRegistration = async () => {
    navigate("/register");
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePassInput = (e) => setPassword(e.target.value);
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
        <div className="login-header">Login</div>
        <CardContent className="input-flex">
          <div className="input-group">
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
          </div>
          <div className="radio-group">
            <FormControl component="fieldset">
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup
                aria-label="role"
                defaultValue="shopper"
                name="role-radio-buttons"
                onChange={handleRadio}
              >
                <FormControlLabel
                  value="shopper"
                  control={<Radio />}
                  label="Shopper"
                />
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                />

                <FormControlLabel
                  value="seller"
                  control={<Radio />}
                  label="Seller"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </CardContent>
        <CardActions>
          <Button
            className="login-btn"
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardActions>
        <CardActions>
          <Button
            className="login-btn"
            variant="contained"
            onClick={handleRegistration}
          >
            Sign Up
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

export default Login;
