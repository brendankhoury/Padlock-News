import { Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import engine from '../personalization_engine/engine';
import '../assets/ArticleComponent.css'


export default class ArticleComponent extends Component {
    state = { article: null }
    constructor(props) {
        super(props)
        // console.log(props.)
        // console.log(props.articleID)
        engine.requestArticle(props.id, (res) => this.updateArticleData(res))
    }
    updateArticleData(article) {
        console.log("Article State Updated")
        this.setState({ article: article })
    }
    render() {

        return (
            <div>
                {this.state.article == null ? (
                    <center>
                        <Typography>
                            LOADING
                        </Typography>
                    </center>
                ) : (
                        <Grid container>
                            <Grid item xs={0} sm={1} />
                            <Grid item xs={12} sm={10}>
                                <article className="article">
                                    <Typography variant="h3">{this.state.article.title}</Typography>
                                    <center>
                                        <Typography >Written By: {this.state.article.authors}</Typography>
                                        <Typography >Written On: {this.state.article.date_publish}</Typography>
                                    </center>
                                    {this.state.article.maintext.split('\n').map(paragraph =>
                                        <div className="paragraph">
                                            <Typography className="paragraph">{paragraph}</Typography>
                                        </div>)}
                                </article>
                            </Grid>
                            <Grid item xs={0} sm={1} />
                        </Grid>
                    )}
            </div>
        )
    }
}
