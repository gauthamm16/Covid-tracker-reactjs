import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import './Infobox.css'


function Infobox({ title,cases,total,...props }) {
    return (
        <Card onClick={props.onClick} className="infoBox">
            <CardContent>
                <Typography color="text-secondary" className="infoBox__title">{title}</Typography>
                    <h2 className="infoBox__cases">{cases}</h2>
                <Typography color="text-secondary" className="infoBox__total">{total} Total </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
