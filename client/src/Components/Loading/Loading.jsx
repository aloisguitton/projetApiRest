import React, {Component} from "react";
import Helmet from "react-helmet";
import {Modal} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Loading.css"

export class Loading extends Component {
    open;

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <>
            <Modal show={this.props.open} backdrop="static" keyboard={false} centered backdropClassName={"wdi-loading-modal-backdrop"} className={"wdi-loading-modal"}>
                <Modal.Body>
                    <CircularProgress className={"align-middle"}/>
                    <span className={"ml-3 h5 mb-0 align-middle"}>Chargement en cours...</span>
                </Modal.Body>
            </Modal>
        </>
    }
}