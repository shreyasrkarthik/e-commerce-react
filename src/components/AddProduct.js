import React, {useState } from "react";

import {
    Card,
    CardContent,
    CardActions,
    TextField,
    FormControl,
    Button,
    Toolbar,
    Typography,
    AppBar, InputLabel, Select, MenuItem, Tooltip, IconButton, Alert, Slide, Snackbar,
} from "@mui/material";
import ErrorSnackbar from "./ErrorSnackbar";
import { useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";

import "../css/Product.css";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("OTHERS");
    const [image, setImage] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    const [loginFail, setLoginFail] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    // useEffect(() => {
    //     if (window.localStorage.getItem("user")) {
    //         navigate("/home");
    //     }
    // }, [navigate]);
    const home = () => {
        navigate("/home");
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddProduct = async () => {
        if (name && description && category && quantity && price) {
            console.log("Adding Product");
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}product/`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        name: name,
                        description: description,
                        quantity: quantity,
                        category: category,
                        image: image,
                        price: price
                    }),
                    headers: {
                        "Content-Type": "Application/json",
                    },
                }
            );
            const success = await response.json();
            if (success != null) {
                console.log(success);
                setOpen(true);
            } else {
                setLoginFail(true);
                setErrorMsg("Unable to add product failed. Try again!");
            }
        } else {
            setErrorMsg("Enter valid input in all the fields.");
            setLoginFail(true);
        }
    };

    const handleNameInput = (e) => setName(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleCategory = (e) => setCategory(e.target.value);
    const handlePrice = (e) => setPrice(e.target.value);
    const handleQuantity = (e) => setQuantity(e.target.value);
    const handleImage = (e) => setImage(e.target.value);

    return (
        <div className="add-product">
            <AppBar className="app-bar-header">
                <Toolbar style={{ textAlign: "center" }}>
                    <Typography
                        variant="body1"
                        style={{ textAlign: "center", float: "right" }}
                        fontSize={30}
                    >
                        Dev E-Commerce
                    </Typography>
                    <div className="right-action-btns" style={{color: "white"}}>
                        <Tooltip title={"Home"}>
                            <IconButton className="action-btn" onClick={home} style={{color: "white"}}>
                                <Home />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
            <>
            </>
            <Card className="login-card" style={{}}>
                <div className="login-header">Add Product</div>
                <CardContent className="input-flex">
                    <div className="input-group">
                        <div className="product-input">
                            <TextField
                                variant="standard"
                                label="Product Name"
                                onChange={handleNameInput}
                            />
                        </div>
                        <div className="product-input">
                            <TextField
                                variant="standard"
                                label="Product Description"
                                onChange={handleDescription}
                            />
                        </div>
                        <div className="product-input">
                            <FormControl fullWidth={true} variant="filled">
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    id="select"
                                    // value={category}
                                    label="Category"
                                    onChange={handleCategory}
                                >
                                    <MenuItem value={"CLOTHES"}>Clothes</MenuItem>
                                    <MenuItem value={"ELECTRONICS"}>Electronics</MenuItem>
                                    <MenuItem value={"HOME_ESSENTIALS"}>Home Essentials</MenuItem>
                                    <MenuItem value={"HEALTH_AND_WELLNESS"}>Health & Wellness</MenuItem>
                                    <MenuItem value={"CHILDREN"}>Children</MenuItem>
                                    <MenuItem value={"OTHERS"}>Others</MenuItem>

                                </Select>

                            </FormControl>
                        </div>

                        <div className="product-input">
                            <TextField
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                onChange={handleQuantity}
                                label="Product Quantity"
                            />
                        </div>

                        <div className="product-input">
                            <TextField
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                onChange={handlePrice}
                                label="Product Price"
                            />
                        </div>

                        <div className="product-input">
                            <TextField

                                label="Image URL"
                                onChange={handleImage}
                            />

                        </div>
                        
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        className="login-btn"
                        variant="contained"
                        onClick={handleAddProduct}
                    >
                        Add
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
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    TransitionComponent={Slide}
                >
                    Product has been added to the Inventory!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AddProduct;
