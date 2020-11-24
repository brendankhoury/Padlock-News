import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core';
import SubjectSection from './SubjectSection';

import '../assets/FeedComponent.css'

import engine from '../personalization_engine/engine.js'


class FeedComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        engine.requestFeed((res) => this.updateFeed(res))
    }

    updateFeed(feed) {
        const temporarilyReformattedFeed = {
            "news": [
              {
                "category": "Top News",
                "categoryColor": "#ddd9fc",
                "categoryId":"1",
                "articles": feed
              }
            ]
        }
        this.setState({ feed: temporarilyReformattedFeed })
    }

    render() {
        return (
            <div className="FeedRoot">
                {this.state.feed != null ? (
                    <Grid container>
                        <Grid item xs={0} sm={1} />
                        <Grid item xs={12} sm={10}>
                            {this.state.feed.news.map(subject => <SubjectSection key={subject.categoryId} categoryColor={subject.categoryColor} articles={subject.articles} category={subject.category} />)}
                        </Grid>
                        <Grid item xs={0} sm={1} />
                    </Grid>
                ) : (
                        <Typography>LOADING</Typography>
                    )}
            </div>
        );
    }
}

export default FeedComponent