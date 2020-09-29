import { Grid, Hidden } from '@material-ui/core'
import React from 'react'
import BigNewsCard from './BigNewsCard'
import SmallNewsCard from './SmallNewsCard'



export default function SubjectSection(props) {
    // Props should have 4 articles in order of importance,
    // The top article will be displayed on a big card and the rest on small cards.
    console.log(props)
    return (
        <div>
            {/* Some sort of subject header up here, probably wrap the entire thing in a paper component*/}
            <Grid containter>
                <Grid item xs = {0} sm = {12} >
                    {/* Article 1 (when the screen is bigger the big is used) */}
                        {/*className={classes.feedRoot} on the card below*/ } 
                    {/* <h3>{props.articles[0]}</h3> */}
                    <Hidden xsDown>
                        <BigNewsCard
                                title={props.articles[0].title} 
                                summary={props.articles[0].summary}
                                image={props.articles[0].imageURL}
                                />
                    </Hidden>
                </Grid>
                <Grid item xs = {12} sm ={0} >
                    <Hidden smUp>
                        
                        Test
                    </Hidden>
                    {/* Article 1 (when the screen is small(xs) the small card is used) */}
                </Grid>
                <Grid item xs = {12} sm = {4} >
                    {/* Article 2 */}
                    <SmallNewsCard
                        title={props.articles[1].title} 
                        summary={props.articles[1].summary}
                        image={props.articles[1].imageURL}
                        />
                </Grid>
                <Grid item xs = {12} sm = {4} >
                    {/* Article 3 */}
                    <SmallNewsCard
                        title={props.articles[2].title} 
                        summary={props.articles[2].summary}
                        image={props.articles[2].imageURL}
                        />
                </Grid>
                <Grid item xs = {12} sm = {4} >
                    {/* Article 4 */}
                    <SmallNewsCard
                        title={props.articles[3].title} 
                        summary={props.articles[3].summary}
                        image={props.articles[3].imageURL}
                        />
                </Grid>
            </Grid>
        </div>
    )
}
