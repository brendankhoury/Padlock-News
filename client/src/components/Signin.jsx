import React from 'react'
import { useConnect } from '@blockstack/connect';
import { Button } from '@material-ui/core';



export default function Signin() {
    const { doOpenAuth } = useConnect();
    return (
        <Button onClick={() => doOpenAuth()} variant="contained" color="secondary">Login</Button>
    )
}
