import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useParams
} from "react-router-dom";

export default class CustomerLandingPage extends Component {
    render() {
        return (
            <div>
                Customer Landing
                {/* <Link to = {{pathname:"/CustomerProfile",state :{c_id} }} >Profile</Link> */}
            </div>
        )
    }
}
