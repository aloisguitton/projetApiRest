import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import {useScrollTrigger, Button} from "@material-ui/core";
import {Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import './Menu.css'

import Logo from '../../Assets/logo.png'

const mapStateToProps = (state) => {

    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action)
        }
    }
}

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    disconnect = () => {
        const action = {type: "DISCONNECT", value: {}}
        this.props.dispatch(action)
    }


    render() {
        const isAuth = this.props.authReducer.loggedIn
        return <>
            <ElevationScroll {...this.props}>
                <AppBar>
                    <Navbar expand="xl" className={"px-2"}>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Brand>
                            <Link to={"/"}>
                                <img
                                    alt=""
                                    src={Logo}
                                    height="38"
                                    className="d-inline-block align-top my-auto"
                                />
                            </Link>
                        </Navbar.Brand>

                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end pl-3">
                            <Nav>
                                {!isAuth ? <Link className="nav-link my-auto" to="/connexion">Se
                                    connecter</Link> : <Link className="nav-link my-auto" onClick={() => {
                                    this.setState({expand: null});
                                    this.disconnect()
                                }}>Se déconnecter</Link>}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </AppBar>
            </ElevationScroll>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

function ElevationScroll(props) {
    const {children, page} = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: page ? page() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger
    });
}