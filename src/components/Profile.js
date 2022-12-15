import '../css/Profile.css';
import {AppBar, Box, IconButton, TextField, Toolbar, Typography} from "@mui/material";
import {Home, Logout} from "@mui/icons-material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('Test FirstName');
    const [lastName, setLastName] = useState('Test LastName');
    const [email, setEmail] = useState('testemail@email.com');
    const [phoneNumber, setPhoneNumber] = useState('123-456-789');
    const [address, setAddress] = useState({
        country: 'USA',
        state: 'MA',
        city: 'Boston',
        street: '360 Huntington Ave',
        zipcode: 0o2115
    });


    const [password, setPassword] = useState('password@1234');

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
            country: newCountry
        }
        setAddress(newAddress);
    }

    const setState = (e) => {
        const newState = e.target.value;
        const newAddress = {
            ...address,
            state: newState
        }
        setAddress(newAddress);
    }

    const setStreet = (e) => {
        const newStreet = e.target.value;
        const newAddress = {
            ...address,
            street: newStreet
        }
        setAddress(newAddress);
    }

    const setCity = (e) => {
        const newCity = e.target.value;
        const newAddress = {
            ...address,
            city: newCity
        }
        setAddress(newAddress);
    }

    const setZipCode = (e) => {
        const newZipCode = e.target.value;
        const newAddress = {
            ...address,
            zipcode: newZipCode
        }
        setAddress(newAddress);
    }

    const passwordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleClickHome = () => {
        navigate('/home');
    };
    const logout = () => {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("userType");
        navigate("/");
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
                        >

                        </IconButton>
                        {
                            window.localStorage.getItem("userType") === "admin" &&
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Admin
                        </Typography>
                        }

                        {
                            window.localStorage.getItem("userType") === "shopper" &&
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Shopper
                            </Typography>
                        }

                        {
                            window.localStorage.getItem("userType") === "staff" &&
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Staff
                            </Typography>
                        }

                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    color="inherit"
                                    onClick={handleClickHome}
                                >
                                    <Home />
                                </IconButton>
                                <IconButton className="action-btn" onClick={logout}>
                                    <Logout />
                                </IconButton>
                            </div>

                    </Toolbar>
                </AppBar>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
            </Box>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    marginTop: '3%'
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="First Name" variant="outlined"  value={firstName}
                           onChange={firstNameChange}/>
                <TextField id="outlined-basic" label="Last Name" variant="outlined"  value={lastName}
                           onChange={lastNameChange}/>
            </Box>
            <Box
                component="form"
                sx={{
                    width: 460,
                    maxWidth: '100%',
                    marginLeft: '35%',
                    marginTop: '2%'
                }}
            >
                <TextField fullWidth label="Email" id="fullWidth" value={email} onChange={emailChange}/>
            </Box>
            <Box
                component="form"
                sx={{
                    width: 460,
                    maxWidth: '100%',
                    marginLeft: '35%',
                    marginTop: '2%'
                }}
                mt={1}
            >
                <TextField fullWidth label="Phone Number" id="fullWidth" value={phoneNumber} onChange={phoneNumberChange}/>
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    marginTop: '2%'
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Country" variant="outlined"  value={address.country}
                           onChange={(event) => setCountry(event)}/>
                <TextField id="outlined-basic" label="State" variant="outlined"  value={address.state}
                           onChange={(event) => setState(event)}/>
            </Box>
            <Box
                component="form"
                sx={{
                    width: 460,
                    maxWidth: '100%',
                    marginLeft: '35%',
                    marginTop: '2%'
                }}
                mt={1}
            >
                <TextField fullWidth label="Street" id="fullWidth" value={address.street} onChange={(event) => setStreet(event)} />
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    marginTop: '2%'
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="City" variant="outlined"  value={address.city}
                           onChange={(event) => setCity(event)}/>
                <TextField id="outlined-basic" label="Zipcode" variant="outlined"  value={address.zipcode}
                           onChange={(event) => setZipCode(event)}/>
            </Box>
            <Box
                component="form"
                sx={{
                    width: 460,
                    maxWidth: '100%',
                    marginLeft: '35%',
                    marginTop: '2%'
                }}
                mt={1}
            >
                <TextField fullWidth label="Password" id="fullWidth" value={password} onChange={passwordChange}/>
            </Box>
        </div>
    )
}

export default Profile;