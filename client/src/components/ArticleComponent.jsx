import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    paragraph:{
        textIndent: "50px",
        marginTop: "10px",
    },
    article:{
        marginTop:"10px"
    }
}));

const articleTest = {
    "title":"Quality not clickbait title",
    "author": "Dr. Suess",
    "dateWritten": "10/08/20",
    "content": `Intreguing article content. Imagine an article here, any article. Something that conveys information. Something that can change someones mind, change the world, or maybe just make someones day. The posibilities are endles, and so is this short essay where I try to test the look of this article on my page. 
    More Intreguing article content. Imagine an article here, any article. Something that conveys information. Something that can change someones mind, change the world, or maybe just make someones day. The posibilities are endles, and so is this short essay where I try to test the look of this article on my page. `

}

export default function ViewArticle(props) {
    //Request article content somehow
    console.log(props.location)
    const classes = useStyles();
    // Imagine articleTest as props.article
    return (
        <Grid container>
            <Grid item xs={0}  sm={1}/>
            <Grid item xs={12} sm={10}>
                <article className = {classes.article}>
                    <Typography variant="h3">{articleTest.title}</Typography>
                    <center>
                        <Typography >Written By: {articleTest.author}</Typography>
                        <Typography >Written On: {articleTest.dateWritten}</Typography>
                    </center>
                    {articleTest.content.split('\n').map(paragraph => <Typography className={classes.paragraph}>{paragraph}</Typography>)}
                </article>
            </Grid>
            <Grid item xs={0}  sm={1}/>
        </Grid>
    )
}
