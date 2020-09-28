import { Card, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      padding:"15px",
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    articleImage: {
        // height:"200px",
        minHeight:"100px",
        maxHeight:"200px",
        borderRadius:"3px",
    },
    articleDescription: {
      paddingLeft: "10px",
    },
}));

export default function BigNewsCard(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <img alt={props.title + " image"} className={classes.articleImage} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FgD4uACwPChA%2Fmaxresdefault.jpg"/>
            <div className={classes.articleDescription}>
              <Typography variant="h3">
                Article title
              </Typography>
              <Typography>
                Initial content
              </Typography>
            </div>
        </Card>
    )
}
