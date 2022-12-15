import React from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

import "../css/ProductDialog.css";

const UserPopUp = ({
  open,
  handleClose,
  firstName,
  lastName,
  type,
  email,
  image,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} className="product-dialog">
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent>
        <img
          src={
            image
              ? image
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
          alt={firstName}
          className="product-img"
          width={250}
          height={250}
        />
        <div className="section">
          <div className="product-desc-heading">
            <Typography variant="body1" color="text.primary">
              Full Name
            </Typography>
          </div>
          <div className="product-desc">
            <div>
              {firstName} {lastName}
            </div>
          </div>
        </div>
        <div className="section">
          <Typography variant="body1" color="text.primary">
            User Type: {type}
          </Typography>
        </div>
        <div className="section">
          <Typography variant="body1" color="text.primary">
            email: {email}
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserPopUp;
