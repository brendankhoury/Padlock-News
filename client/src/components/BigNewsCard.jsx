import { Card, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // padding: "15px",
    marginTop: "20px",
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  articleImage: {
    height:"250px",
    // minHeight: "100px",
    // maxHeight: "200px",
    borderRadius: "3px",
  },
  articleDescription: {
    paddingLeft: "10px",
  },
}));

export default function BigNewsCard(props) {
  const classes = useStyles();
  // TODO: Add image url support
  return (
    <Card className={classes.root}>
      <CardMedia>
        <img alt={props.title + " image"} className={classes.articleImage} src={props.image}/>
      </CardMedia>
      <div className={classes.articleDescription}>
        <Typography variant="h3">{props.title}</Typography>
        <Typography>{props.summary}</Typography>
      </div>
    </Card>
  )
}
