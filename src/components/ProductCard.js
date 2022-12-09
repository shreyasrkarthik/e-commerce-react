import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
} from "@mui/material";
import ProductDialog from "./ProductDialog";
import { AddShoppingCart, Delete } from "@mui/icons-material";

import "../css/ProductCard.css";

const ProductCard = ({ product, deleteProduct, updateProduct, addToCart }) => {
    const { _id, category, name, price } = product;
    const [openDialog, setOpenDialog] = useState(false);

    const categoryMap = {};
    const formatCategory = (category) => {
        if (category) {
            if (!categoryMap[category]) {
                const words = category.split("_").join(" ");
                let formattedCategory =
                    words.slice(0, 1).toUpperCase() + words.slice(1).toLowerCase();
                categoryMap[category] = formattedCategory;
            }

            return categoryMap[category];
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        deleteProduct(_id);
    };

    return (
        <div>
            <Card className="product-card" onClick={() => setOpenDialog(true)}>
                <CardMedia
                    component="img"
                    height="180"
                    image="https://picsum.photos/380/180"
                    alt={name}
                />
                <CardContent className="product-overview">
                    <div>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {formatCategory(category)}
                        </Typography>
                        <Typography variant="body2" color="text.subtitle">
                            ${price}
                        </Typography>
                    </div>
                    <div className="action-btns">
                        {window.localStorage.getItem("userType") === "admin" ? (
                            <IconButton color="error" onClick={handleDelete}>
                                <Delete />
                            </IconButton>
                        ) : (
                            <IconButton
                                color="info"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                            >
                                <AddShoppingCart />
                            </IconButton>
                        )}
                    </div>
                </CardContent>
            </Card>
            <ProductDialog
                open={openDialog}
                handleClose={() => {
                    setOpenDialog(false);
                }}
                updateProduct={updateProduct}
                product={{ ...product, category: formatCategory(category) }}
            />
        </div>
    );
};

export default ProductCard;