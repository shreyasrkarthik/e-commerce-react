import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

import "../css/SellerCard.css";

const SellerCard = ({ seller }) => {
    const { address, companyName, establishedYear, ratings } = seller;

    return (
        <div className="seller-card">
            <Card>
                <CardContent>
                    <Typography variant="body1">{companyName}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {address}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {" "}
                        Since {establishedYear}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        ratings: {ratings}/10
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default SellerCard;