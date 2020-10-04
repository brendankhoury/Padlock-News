import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React from 'react'



const useStyles = makeStyles((theme) => ({
    media: {
        height: 140,
        // height: 0,
        // paddingTop: '56.25%', // 16:9,  https://stackoverflow.com/questions/50272814/image-on-material-ui-cardmedia#50543368
        // marginTop:'30' 
        // width:"100%",
        // maxHeight:"30%"
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
                    <CardMedia
                        className={classes.media}
                        component="img"
                        // height="180px"
                        // width="100%"
                        // style={{height: 0, paddingTop: '56.25%'}}
                        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FgD4uACwPChA%2Fmaxresdefault.jpg"
                        title="Fill ArticleTitleHere"
                    />

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
