import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import "./global.css"
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Menu from "./Components/Menu/Menu";
import {Provider} from 'react-redux'
import {store, persistor} from './Store/store'
import {PersistGate} from 'redux-persist/integration/react'


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff7979',
        },
        secondary: {
            main: '#ff7724'
        }
    },
    typography: {
        h1: {
            fontSize: "45px"
        },
        h2: {
            fontSize: "40px",
            fontWeight: 500
        },
        h3: {
            fontSize: "35px"
        },
        h4: {
            fontSize: "1.5rem"
        },
        h5: {
            fontSize: "1.3rem"
        },
        h6: {
            fontSize: "1.1rem"
        },
        body1: {
            fontSize: "25px",
            fontWeight: 300
        }
    },
    zIndex: {
        appBar: 1000
    }
})

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <Menu/>
                    <div style={{marginTop: "65px"}}>
                        <App/>
                    </div>
                </MuiThemeProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
