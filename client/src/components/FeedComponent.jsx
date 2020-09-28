import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import SubjectSection from './SubjectSection.jsx'
import { Grid, makeStyles, withStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    feedRoot:{
        marginTop:"1000px",
        // backgroundColor:"#555555"
    },
}));
   
class FeedComponent extends Component {
    render() {
        // const { classes } = this.props;
        console.log(this.props.feed)
        return (
            <div>
                <Grid container>
                    <Grid item xs = {0}  sm={2}/>
                    <Grid item xs = {12} sm={8}>
                        {this.props.feed.news.map(subject => <h1>{subject.category} </h1>)}
                        {/* <SubjectSection/> */}
                    </Grid>
                    <Grid item xs = {0}  sm={2}/>
                </Grid>
            </div>
        );
    }

}
FeedComponent.propTypes = {
    feed: PropTypes.array.isRequired
}


export default withStyles(useStyles)(FeedComponent)