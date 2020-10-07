import { Typography } from '@material-ui/core'
import React from 'react'



export default function ViewArticle(props) {
    //Request article content somehow
    console.log(props.location)
    return (
        <div>
            {/* <h1>{props.location.pathname}</h1> */}
            <Typography variant="h3">Quality not clickbait title</Typography>
            <Typography>
                {/* {props.articleContent} */}
                Intreguing article content
            </Typography>
        </div>
    )
}
