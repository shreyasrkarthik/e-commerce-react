import React, { useState } from "react";
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
} from "@mui/material";
import ErrorSnackbar from "./ErrorSnackbar";
import { useNavigate } from "react-router-dom";

import "../css/Login.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [phone, setPhone] = useState("");
    const [loginFail, setLoginFail] = useState(false);
    const [userType, setUserType] = useState("shopper");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (email && password) {
            console.log("URI", process.env.REACT_APP_API_URL);
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}user/`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        "firstName" : firstName,
                        "lastName" : lastName,
                        "email" : email,
                        "phone" : phone,
                        "addresses" : addresses,
                        "password" : password,
                        "userType" : userType,
                    }),
                    headers: {
                        "Content-Type": "Application/json",
                    },
                }
            );
            const { success } = await response.json();
            if (success!=null) {
                // window.localStorage.setItem("user", email);
                // window.localStorage.setItem("userType", userType);
                console.log(success)
                navigate("/");
            } else {
                setLoginFail(true);
                setErrorMsg("Registration failed. Try again!");
            }
        } else {
            setErrorMsg("Valid email and password are required");
            setLoginFail(true);
        }
    };

    const handleEmailInput = (e) => {
        if(/\S+@\S+\.\S+/.test(e.target.value)){
            setEmail(e.target.value)
        }
    };
    const handlePassInput = (e) => setPassword(e.target.value);
    const handleFirstNameInput = (e) => setFirstName(e.target.value);
    const handleLastNameInput = (e) => setLastName(e.target.value);
    const handlePhoneInput = (e) => setPhone(e.target.value);
    const handleAddressInput = (e) => setAddresses([e.target.value]);
    const handleRadio = (e) => setUserType(e.target.value);


    return (
        <div className="login">
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
                                label="Password"
                                onChange={handlePassInput}
                            />
                        </div>
                        <div className="login-input">
                            <TextField
                                variant="standard"
                                label="Phone"
                                onChange={handlePhoneInput}
                            />
                        </div>
                        <div className="login-input">
                            <TextField
                                variant="standard"
                                label="Address"
                                onChange={handleAddressInput}
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