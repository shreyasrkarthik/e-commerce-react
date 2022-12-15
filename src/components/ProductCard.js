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

  const truncate = (str) => {
    return str.length > 25 ? str.substring(0, 20) + "..." : str;
  };

  return (
    <div>
      <Card className="product-card" onClick={() => setOpenDialog(true)}>
        <CardMedia
          component="img"
          height="180"
          image={
            product.source === "thirdparty_api"
              ? product.image
              : "https://picsum.photos/380/180"
          }
          alt={name}
        />
        <CardContent className="product-overview">
          <div>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {truncate(name)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatCategory(category)}
            </Typography>
            <Typography variant="body2" color="text.subtitle">
              ${price}
            </Typography>
            {product.source === "thirdparty_api" ? (
              <Typography
                style={{
                  color: "red",
                  float: "left",
                  backgroundColor: "yellow",
                  borderRadius: "5px",
                  padding: "5px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  border: "1px solid red",
                }}
                stylevariant="body2"
                color="text.subtitle"
              >
                Source: Third Party Seller
              </Typography>
            ) : (
              <Typography
                style={{
                  color: "blue",
                  float: "left",
                  backgroundColor: "yellow",
                  borderRadius: "5px",
                  padding: "5px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  border: "1px solid blue",
                }}
                variant="body2"
                color="text.subtitle"
              >
                Source: Our Store
              </Typography>
            )}
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
