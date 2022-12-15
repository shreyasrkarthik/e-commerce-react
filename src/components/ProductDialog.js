import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
  Input,
} from "@mui/material";
import SellerCard from "./SellerCard";
import ReviewCard from "./ReviewCard";
import { Check, Edit } from "@mui/icons-material";

import "../css/ProductDialog.css";

const ProductDialog = ({ open, handleClose, product, updateProduct }) => {
  const {
    _id,
    name,
    category,
    price,
    description,
    quantity,
    sellers,
    reviews,
  } = product;

  const [offlineReviews, setOfflineReviews] = useState([]);
  const [review, setReview] = useState("");
  const [editing, setEditing] = useState(false);
  const [productName, setProductName] = useState(name);
  const [productDesc, setProductDesc] = useState(description);
  const [productPrice, setProductPrice] = useState(price);
  const [productCt, setProductCt] = useState(quantity);
  const [edited, setEdited] = useState(false);

  const handleAddReview = (e) => setReview(e.target.value);

  const submitReview = async () => {
    if (review.length > 0) {
      const reviewObj = {
        content: review,
        created: new Date(),
        updated: new Date(),
      };
      setOfflineReviews((oldOfflineReviews) => {
        oldOfflineReviews.push(reviewObj);
        return oldOfflineReviews;
      });
      setReview("");
      await fetch(`${process.env.REACT_APP_API_URL}product/${_id}/add-review`, {
        method: "POST",
        body: JSON.stringify({ review: reviewObj }),
        headers: {
          "Content-Type": "Application/json",
        },
      });
    }
  };

  const toggleEdit = async () => {
    if (editing && edited) {
      const updatedProduct = {
        name: productName,
        description: productDesc,
        price: productPrice,
        quantity: productCt,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}product/${_id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            product: updatedProduct,
          }),
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );

      const data = await response.json();
      if (data.updatedProduct) {
        updateProduct(_id, updatedProduct);
      } else {
        console.log("Failed to updated");
      }

      setEdited(false);
    }
    setEditing((isEditing) => !isEditing);
  };

  return (
    <Dialog open={open} onClose={handleClose} className="product-dialog">
      <DialogTitle>{productName}</DialogTitle>
      <DialogContent>
        <img
          src={
            product.source === "thirdparty_api"
              ? product.image
              : "https://picsum.photos/550/280"
          }
          alt={name}
          className="product-img"
        />
        <div className="section">
          <div className="product-desc-heading">
            <Typography variant="body1" color="text.primary">
              Product Info
            </Typography>
            {window.localStorage.getItem("userType") === "admin" &&
              (editing ? (
                <IconButton color="info" onClick={toggleEdit}>
                  <Check />
                </IconButton>
              ) : (
                <IconButton color="info" onClick={toggleEdit}>
                  <Edit />
                </IconButton>
              ))}
          </div>
          <div className="product-desc">
            {editing ? (
              <div>
                <TextField
                  value={productName}
                  multiline
                  fullWidth
                  variant="standard"
                  label="Product name"
                  maxRows={1}
                  type="text"
                  className="product-edit-input"
                  onChange={(e) => {
                    setProductName(e.target.value);
                    setEdited(true);
                  }}
                />
                <TextField
                  value={productDesc}
                  multiline
                  fullWidth
                  variant="standard"
                  label="Description"
                  maxRows={4}
                  type="text"
                  className="product-edit-input"
                  onChange={(e) => {
                    setProductDesc(e.target.value);
                    setEdited(true);
                  }}
                />
                <FormControl variant="standard" className="product-edit-input">
                  <InputLabel htmlFor="product-price-input">Price</InputLabel>
                  <Input
                    id="product-price-input"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    value={productPrice}
                    type="number"
                    onChange={(e) => {
                      setProductPrice(parseInt(e.target.value));
                      setEdited(true);
                    }}
                  />
                </FormControl>
                <FormControl variant="standard" className="product-edit-input">
                  <InputLabel htmlFor="product-ct-input">Quantity</InputLabel>
                  <Input
                    id="product-ct-input"
                    endAdornment={
                      <InputAdornment position="end">ct</InputAdornment>
                    }
                    value={productCt}
                    type="number"
                    onChange={(e) => {
                      setProductCt(parseInt(e.target.value));
                      setEdited(true);
                    }}
                  />
                </FormControl>
              </div>
            ) : (
              <div>
                <Typography variant="body1" color="text.primary">
                  Description: {productDesc}
                </Typography>
                <div className="price-quantity-section">
                  <Typography variant="caption">
                    Price: ${productPrice}
                  </Typography>
                  <Typography variant="caption">
                    Quantity: {productCt} ct
                  </Typography>
                </div>
                <Typography variant="caption" color="text.secondary">
                  Category: {category}
                </Typography>
              </div>
            )}
          </div>
        </div>
        <div className="section">
          <Typography variant="body1" color="text.primary">
            Sellers
          </Typography>
          <div className="sellers">
            {sellers.map((seller) => (
              <SellerCard key={seller._id} seller={seller} />
            ))}
          </div>
        </div>
        <div className="section">
          <Typography variant="body1" color="text.primary">
            Reviews
          </Typography>
          <div className="reviews">
            {[...reviews, ...offlineReviews].map((review) => (
              <ReviewCard
                key={review ? review._id : new Date()}
                review={review}
              />
            ))}
          </div>
          {window.localStorage.getItem("userType") === "shopper" && (
            <div className="new-review">
              <TextField
                label="Review"
                multiline
                maxRows={4}
                placeholder="Add a review"
                type="text"
                onChange={handleAddReview}
                value={review}
              />
              <Button variant="contained" onClick={submitReview}>
                Submit
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
