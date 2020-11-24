import { Typography } from '@material-ui/core'
import React from 'react'
import engine from '../personalization_engine/engine'


export default function Profile() {
    return (
        <div>
            <Typography type="h1">
                Your data:
            </Typography>
            <Typography type="h5">
                Datadump: 
                <br/>
                {JSON.stringify(engine.getUserData())}
            </Typography>
        </div>
    )
}
