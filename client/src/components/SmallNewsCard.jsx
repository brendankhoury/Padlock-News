import { Card, CardActionArea, CardContent, makeStyles, Typography } from '@material-ui/core'
import React from 'react'



const useStyles = makeStyles((theme) => ({
    media: {
        height: '200px',
        width:'100%'
    },
    root: {
        marginTop: '0px',
        flexGrow:1
    }
}));

export default function SmallNewsCard(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Card>
                <CardActionArea>
                    <img alt={"Image for: " + props.title} className={classes.media} src={props.image}/>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.summary}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card> 
        </div>
    )
}
