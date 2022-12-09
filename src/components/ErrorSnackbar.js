import React from "react";
import { IconButton, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ErrorSnackbar = ({ open, handleClose, message }) => {
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={5000}
            action={action}
            message={message}
        >
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default ErrorSnackbar;