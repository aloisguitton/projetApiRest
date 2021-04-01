import React, {Component} from "react";
import Helmet from "react-helmet";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {post} from "../../Service/Requests";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import {connect} from "react-redux";
let md5 = require('md5');

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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "test@gmail.fr",
            password: "pass",
            error: false
        }
    }

    handleSubmit = () => {
        let data = {
            email: this.state.email,
            password: md5(this.state.password)
        }
        post("user/connect", data)
            .then((res) => {
                const action = {
                    type: "CONNECT",
                    value: {token: "Bearer " + res.data.token, user_id: res.data.userId}
                }
                this.props.dispatch(action)
            })
            .catch((e) => {
                this.setState({
                    error: true
                })
            })
    }

    render() {
        return <>
            <Helmet>
                <title>Connexion</title>
                <meta name="description" content=""/>
            </Helmet>

            <div className="row">
                <div className="col-10 col-md-6 offset-1 offset-md-3 mt-5">
                    <div>
                        <TextField className={"w-100 mb-2"} variant={"outlined"} label={"Email"} value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}}/>
                        <TextField className={"w-100 mb-2"} variant={"outlined"} label={"Mot de passe"} type="password" value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}}/>
                        <div className="text-center ">
                            <Button variant={"contained"} color={"primary"} onClick={this.handleSubmit}>Se connecter</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar open={this.state.error} autoHideDuration={6000} onClose={() => {this.setState({error: false})}}>
                <Alert severity={"error"}>
                    Une erreur s'est produite.
                </Alert>
            </Snackbar>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)