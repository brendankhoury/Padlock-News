import { Grid } from '@material-ui/core'
import React from 'react'
import BigNewsCard from './BigNewsCard'

export default function SubjectSection(props) {
    // Props should have 4 articles in order of importance,
    // The top article will be displayed on a big card and the rest on small cards.
    return (
        <div>
            {/* Some sort of subject header up here, probably wrap the entire thing in a paper component*/}
            <Grid containter>
                <Grid xs = {0} sm = {12} item>
                    {/* Article 1 (when the screen is bigger the big is used) */}
                        {/*className={classes.feedRoot} on the card below*/ } 

                    <BigNewsCard
                            title={props.articles[0].title} 
                            articleContent={props.articles[0].content /* Content should only contain a small amount of text, consider using substring */ }
                            image={props.articles[0].imageURL}
                            />
                </Grid>
                <Grid xs = {12} sm ={0} item>
                    {/* Article 1 (when the screen is small the small card is used) */}
                    
                </Grid>
                <Grid xs = {12} sm ={4} item>
                    {/* Article 2 */}
                </Grid>
                <Grid xs = {12} sm ={4} item>
                    {/* Article 3 */}
                </Grid>
                <Grid xs = {12} sm ={4} item>
                    {/* Article 4 */}
                </Grid>
            </Grid>
        </div>
    )
}
