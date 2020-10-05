import React, { Component } from 'react'
import { Grid, makeStyles, withStyles } from '@material-ui/core';
import SubjectSection from './SubjectSection';

const useStyles = makeStyles((theme) => ({
    feedRoot:{
        flexGrow:1
    },
}));
   
class FeedComponent extends Component {
    render() {
        const { classes } = this.props;
        console.log(this.props.feed)
        return (
            <div className = {classes.feedRoot} >
                <Grid container>
                    <Grid item xs={0}  sm={1}/>
                    <Grid item xs={12} sm={10}>
                        {this.props.feed.news.map(subject => <SubjectSection key={subject.categoryId}  categoryColor={subject.categoryColor} articles={subject.articles} category={subject.category}/>)}                    
                    </Grid>
                    <Grid item xs={0}  sm={1}/>
                </Grid>
            </div>
        );
    }

}


export default withStyles(useStyles)(FeedComponent)