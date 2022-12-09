import React, { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    MenuItem,
    Button,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const CreateProduct = ({ open, handleClose, allSellers, addNewProduct }) => {
    const categories = [
        {
            value: "CLOTHES",
            label: "Clothes",
        },
        {
            value: "ELECTRONICS",
            label: "Electronics",
        },
        {
            value: "HOME_ESSENTIALS",
            label: "Home essentials",
        },
        {
            value: "HEALTH_AND_WELLNESS",
            label: "Health and fitness",
        },
        {
            value: "CHILDREN",
            label: "Children",
        },
        {
            value: "OTHERS",
            label: "Others",
        },
    ];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [randomSellers, setRandomSellers] = useState([]);
    const sellers = {};

    useEffect(() => {
        setRandomSellers(allSellers.sort(() => 0.5 - Math.random()).slice(0, 5));
    }, [allSellers]);

    const resetState = () => {
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setQuantity("");
    };

    const handleCreateProduct = async () => {
        const availableSellers = new Set(
            Object.entries(sellers)
                .filter(([_key, value]) => value)
                .map(([key, _value]) => key)
        );

        const finalSellers = randomSellers.filter((seller) =>
            availableSellers.has(seller._id)
        );

        const newProduct = {
            name,
            description,
            category,
            price,
            quantity,
            sellers: finalSellers,
        };

        const response = await fetch(`${process.env.REACT_APP_API_URL}product`, {
            method: "POST",
            body: JSON.stringify({ product: newProduct }),
            headers: {
                "Content-Type": "Application/json",
            },
        });

        const data = await response.json();
        if (data.newProduct) {
            console.log("here");
            addNewProduct(data.newProduct);
            resetState();
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} className="create-product-dialog">
            <DialogTitle>Create a new product</DialogTitle>
            <DialogContent>
                <Typography variant="body1">Product Description</Typography>
                <div className="section">
                    <TextField
                        label="Product name"
                        fullWidth
                        variant="standard"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        className="create-product-input"
                    />
                    <TextField
                        label="Product description"
                        fullWidth
                        variant="standard"
                        type="text"
                        className="create-product-input"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <TextField
                        variant="standard"
                        select
                        fullWidth
                        label="Category"
                        helperText="Select a category"
                        className="create-product-input"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.value} value={category.value}>
                                {category.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormControl variant="standard" className="create-product-input">
                        <InputLabel htmlFor="product-price-input">Price</InputLabel>
                        <Input
                            id="product-price-input"
                            startAdornment={
                                <InputAdornment position="start">$</InputAdornment>
                            }
                            type="number"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                        />
                    </FormControl>
                    <FormControl variant="standard" className="create-product-input">
                        <InputLabel htmlFor="product-ct-input">Quantity</InputLabel>
                        <Input
                            id="product-ct-input"
                            endAdornment={<InputAdornment position="end">ct</InputAdornment>}
                            type="number"
                            value={quantity}
                            onChange={(e) => {
                                setQuantity(e.target.value);
                            }}
                        />
                    </FormControl>
                </div>
                <Typography variant="body1">Add seller(s)</Typography>
                <div className="section">
                    <FormGroup>
                        {randomSellers.map((seller) => (
                            <FormControlLabel
                                key={seller._id}
                                control={
                                    <Checkbox
                                        value={seller._id}
                                        onChange={(e) => {
                                            sellers[e.target.value] = e.target.checked;
                                        }}
                                    />
                                }
                                label={seller.companyName}
                            />
                        ))}
                    </FormGroup>
                </div>
                <Button
                    onClick={handleCreateProduct}
                    variant="contained"
                    className="create-product-btn"
                >
                    <Add className="add-product-icon" />
                    Create
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProduct;