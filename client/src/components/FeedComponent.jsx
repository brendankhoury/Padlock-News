import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
import SubjectSection from './SubjectSection';

import '../assets/FeedComponent.css'

import engine from '../personalization_engine/engine.js'

   
class FeedComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {feed:new engine().request_feed()}
    }
    render() {
        // const { classes } = this.props;
        // const classes = useStyles()
        return (
            <div className="FeedRoot">
                <Grid container>
                    <Grid item xs={0}  sm={1}/>
                    <Grid item xs={12} sm={10}>
                        {this.state.feed.news.map(subject => <SubjectSection key={subject.categoryId}  categoryColor={subject.categoryColor} articles={subject.articles} category={subject.category}/>)}                    
                    </Grid>
                    <Grid item xs={0}  sm={1}/>
                </Grid>
            </div>
        );
    }

}

export default FeedComponent