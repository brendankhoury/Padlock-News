import { Button, Link} from '@material-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';


export default function ProfileButton(props) {
    return (
        <Link component={RouterLink} to={"/profile"}>
            <Button variant="contained" color="secondary">
                Profile
            </Button>
        </Link>
    )
}
