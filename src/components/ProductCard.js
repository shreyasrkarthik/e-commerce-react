import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import ProductDialog from "./ProductDialog";
import { AddShoppingCart, Delete } from "@mui/icons-material";

import "../css/ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, deleteProduct, updateProduct, addToCart }) => {
  const { _id, category, name, price } = product;
  const [openDialog, setOpenDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const login = () => {
    navigate("/login");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
                  if (window.localStorage.getItem("userType") != null) {
                    e.stopPropagation();
                    addToCart(product);
                  } else {
                    handleClickOpenModal();
                    e.stopPropagation();
                    console.log("Here");
                  }
                }}
              >
                <AddShoppingCart />
              </IconButton>
            )}
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login/Sign-Up"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have to login/Sign-Up to add this product to the cart.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Back</Button>
          <Button onClick={login} autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
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
