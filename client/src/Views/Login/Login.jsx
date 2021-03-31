import React, {Component} from "react";
import Helmet from "react-helmet";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <>
            <Helmet>
                <title>Connexion</title>
                <meta name="description" content=""/>
            </Helmet>
        </>
    }
}