import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";


function Infobox({ title,cases,total }) {
    return (
        <Card>
            <CardContent>
                <Typography color="text-secondary" className="infobox__title">{title}</Typography>
                    <h2 className="infobox__cases">{cases}</h2>
                <Typography color="text-secondary" className="infobox__deaths">{total}</Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
