import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core';
import SubjectSection from './SubjectSection';

import '../assets/FeedComponent.css'

import engine from '../personalization_engine/engine.js'


class FeedComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {}
        new engine().requestFeed((res) => this.updateFeed(res))
    }
    componentDidMount() {
        // Haha, good luck getting this to work future me. Have to call async functions to load the feed. Consider some sort of callback to update the component when it occurs.

    }
    updateFeed(feed) {
        console.log("Feed updated")
        console.log(feed)
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
        console.log(temporarilyReformattedFeed.news[0].articles)
        this.setState({ feed: temporarilyReformattedFeed })
        console.log(this.state.feed.news[0].articles)
        console.log(this.state)
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