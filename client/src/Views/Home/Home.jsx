import React, {Component} from "react";
import Helmet from "react-helmet";

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <>
            <Helmet>
                <title></title>
                <meta name="description" content=""/>
            </Helmet>
        </>
    }
}