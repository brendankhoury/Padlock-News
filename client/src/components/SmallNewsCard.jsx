import { Card, CardActionArea, CardContent, Link, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';



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
            <Link component={RouterLink} to={"/read?a=" + props.id}>
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
            </Link> 
        </div>
    )
}
