import React, {Component} from "react";
import Helmet from "react-helmet";

export class page_404 extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {}
    }

    render()
    {
        return <>
            <Helmet>
                <title>Page introuvable</title>
                <meta name="description" content=""/>
            </Helmet>
            <h1>404</h1>
        </>
    }
}