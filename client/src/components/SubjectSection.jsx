import { Grid, Hidden, makeStyles } from '@material-ui/core'
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
            {/* Some sort of subject header up here, probably wrap the entire thing in a paper component*/}
            <Grid container spacing={3}>
                <Grid item xs={0}  sm={12}>
                    {/* Article 1 (when the screen is bigger the big is used) */}
                    <Hidden xsDown>
                        <BigNewsCard
                                title={props.articles[0].title} 
                                summary={props.articles[0].summary}
                                image={props.articles[0].imageURL}
                                />
                    </Hidden>
                </Grid>
                <Grid item xs={12} sm={0}>
                    <Hidden smUp>
                        <SmallNewsCard
                            title={props.articles[0].title} 
                            summary={props.articles[0].summary}
                            image={props.articles[0].imageURL}
                            />
                    </Hidden>
                    {/* Article 1 (when the screen is small(xs) the small card is used) */}
                </Grid>
                {props.articles.slice(1).map(article =>                 
                    <Grid item xs={12} sm={4}>
                        <SmallNewsCard
                            title={article.title} 
                            summary={article.summary}
                            image={article.imageURL}
                            />
                    </Grid>)
                }    

            </Grid>
        </div>
        
    )
}
