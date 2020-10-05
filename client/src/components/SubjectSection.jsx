import { Grid, Hidden, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import BigNewsCard from './BigNewsCard'
import SmallNewsCard from './SmallNewsCard'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow:1
    },
}));


export default function SubjectSection(props) {
    // Props should have 4 articles in order of importance,
    // The top article will be displayed on a big card and the rest on small cards.
    console.log(props)
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div style = {{backgroundColor: props.themeColor}}>
                <Typography variant="h2">Header</Typography>
                <Grid container spacing={3}>
                    <Hidden xsDown>
                        <Grid item sm={12}>
                        {/* Article 1 (when the screen is bigger the big is used) */}
                            <BigNewsCard
                                    title={props.articles[0].title} 
                                    summary={props.articles[0].summary}
                                    image={props.articles[0].imageURL}
                                    />
                        </Grid>
                    </Hidden>
                    <Hidden smUp>
                        <Grid item xs={12}>
                            <SmallNewsCard
                                title={props.articles[0].title} 
                                summary={props.articles[0].summary}
                                image={props.articles[0].imageURL}
                                />
                        {/* Article 1 (when the screen is small(xs) the small card is used) */}
                        </Grid>
                    </Hidden>
                    {props.articles.slice(1).map(article =>                 
                        <Grid item xs={12} sm={4} key={article.id}>
                            <SmallNewsCard
                                title={article.title} 
                                summary={article.summary}
                                image={article.imageURL}
                                
                                />
                        </Grid>)
                    }
                </Grid>
            </div   >

        </div>
        
    )
}
