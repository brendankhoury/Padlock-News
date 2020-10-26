import React, { Component } from 'react'
import { Grid, makeStyles, withStyles } from '@material-ui/core';
import SubjectSection from './SubjectSection';

import engine from '../personalization_engine/engine.js'


const useStyles = makeStyles((theme) => ({
    feedRoot:{
        flexGrow:1
    },
}));
   
class FeedComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {feed:new engine().request_feed()}
    }
    render() {
        const { classes } = this.props;

        return (
            <div className = {classes.feedRoot} >
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


export default withStyles(useStyles)(FeedComponent)