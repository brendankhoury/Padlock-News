import { Grid, Hidden, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import BigNewsCard from './BigNewsCard'
import SmallNewsCard from './SmallNewsCard'

// const useStyles = 


export default function SubjectSection(props) {
    // Props should have 4 articles in order of importance,
    // The top article will be displayed on a big card and the rest on small cards.
    const classes = makeStyles((theme) => ({
        root: {
            flexGrow:1,
            backgroundColor:props.categoryColor,
            padding:"15px",
            margin:"10px",
            borderRadius:"8px",
        },
        
    }))();
    return (
        <div className={classes.root}>
            {/* <div backgroundColor={props.categoryColor} style = {{backgroundColor: props.categoryColor, padding:"10px"}}> */}
                <Typography variant="h2">{props.category}</Typography>
                <Grid container spacing={3}>
                    <Hidden smDown>
                        <Grid item sm={12}>
                        {/* Article 1 (when the screen is bigger the big is used) */}
                            <BigNewsCard
                                    title={props.articles[0].title} 
                                    summary={props.articles[0].summary}
                                    image={props.articles[0].image_url}
                                    id={props.articles[0]._id}
                                    />
                        </Grid>
                    </Hidden>
                    <Hidden mdUp>
                        <Grid item xs={12}>
                            <SmallNewsCard
                                title={props.articles[0].title} 
                                summary={props.articles[0].summary}
                                image={props.articles[0].image_url}
                                id={props.articles[0]._id}

                                />
                        {/* Article 1 (when the screen is small(xs) the small card is used) */}
                        </Grid>
                    </Hidden>
                    {props.articles.slice(1).map(article =>                 
                        <Grid item xs={12} sm={4} key={article.id}>
                            <SmallNewsCard
                                title={article.title} 
                                summary={article.summary}
                                image={article.image_url}
                                id={props.articles[0]._id}

                                />
                        </Grid>)
                    }
                </Grid>
            {/* </div   > */}

        </div>
        
    )
}
