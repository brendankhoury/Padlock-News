import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    paragraph:{
        textIndent: "50px",
    },
    article:{
        marginTop:"10px"
    }
}));



export default function ViewArticle(props) {
    //Request article content somehow
    console.log(props.location)
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={0}  sm={1}/>
            <Grid item xs={12} sm={10}>
                <article className = {classes.article}>
                    <Typography variant="h3">Quality not clickbait title</Typography>
                    <Typography className={classes.paragraph}>
                        {/* {props.articleContent} */}
                        Intreguing article content. Imagine an article here, any article. Something that conveys information. Something that can change someones mind, change the world, or maybe just make someones day. The posibilities are endles, and so is this short essay where I try to test the look of this article on my page. 
                    </Typography>  
                    <Typography className={classes.paragraph}>
                        {/* {props.articleContent} */}
                        More Intreguing article content. Imagine an article here, any article. Something that conveys information. Something that can change someones mind, change the world, or maybe just make someones day. The posibilities are endles, and so is this short essay where I try to test the look of this article on my page. 
                    </Typography> 
                </article>
            </Grid>
            <Grid item xs={0}  sm={1}/>
        </Grid>
    )
}
