import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const ReviewCard = ({ review }) => {
    const { content, created } = review;
    return (
        <div>
            <Card className="review-card">
                <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                        {created
                            ? new Date(created).toLocaleDateString()
                            : new Date().toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                        {content}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReviewCard;