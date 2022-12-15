import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import UserPopUp from "./UserPopUp";

const UserDetails = (props) => {
  console.log(props);
  const firstName = props.firstName;
  const lastName = props.lastName;
  const userType = props.userType;

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      {firstName ? (
        <Card className="product-card" onClick={() => setOpenDialog(true)}>
          <CardMedia
            component="img"
            height="180"
            image={
              props.image
                ? props.image
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            }
            alt={firstName}
          />
          <CardContent className="product-overview">
            <div>
              <Typography gutterBottom variant="h5" component="div">
                First Name: {firstName}
              </Typography>
              {lastName !== "na" ? (
                <Typography gutterBottom variant="h6" component="div">
                  Last Name: {lastName}
                </Typography>
              ) : (
                <></>
              )}
              <Typography variant="body2" color="text.subtitle">
                {userType}
              </Typography>
            </div>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
      <UserPopUp
        open={openDialog}
        handleClose={() => {
          setOpenDialog(false);
        }}
        firstName={firstName}
        lastName={lastName}
        type={userType}
        email={props.email}
        image={props.image}
      />
    </div>
  );
};

export default UserDetails;
