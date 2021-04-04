import React, {Component} from "react";
import Helmet from "react-helmet";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {del, get, post} from "../../Service/Requests";
import {capitalize} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {Loading} from "../../Components/Loading/Loading";

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,

            covidCountries: [],
            covid: [],
            covidData: [],

            weather: [],
            weatherCountry: ["Rennes", "Bordeaux", "Paris"],
            weatherData: [],

            news: [],
            newsCountry: [],
            optionNewsCountry: [
                {
                    name: "Allemagne",
                    value: "de"
                }, {
                    name: "France",
                    value: "fr"
                }, {
                    name: "Royaume-Uni",
                    value: "gb"
                }
            ],
            newsType: [
                {
                    name: "Générale",
                    value: "general"
                }, {
                    name: "Business",
                    value: "business"
                }, {
                    name: "Santé",
                    value: "health"
                }, {
                    name: "Science",
                    value: "science"
                }
            ],
            newsData: [],
        }
    }

    componentDidMount() {
        const allCountry = new Promise((resolve) => {
            get("covid/allCountry")
                .then((res) => {
                    let covidCountries = []
                    res.data.message.map((r) => {
                        covidCountries.push(r['Slug'])
                    })
                    this.setState({
                        covidCountries: covidCountries
                    })
                    resolve()
                })
        });
        const getweather = new Promise((resolve) => {
            get("weather/getweather")
                .then((res) => {
                    this.setState({
                        weatherData: res.data
                    })
                    let arr = []
                    res.data.map((d) => {
                        arr.push(d.weather.city)
                    })
                    this.setState({
                        weather: arr
                    })
                    resolve()
                })
        })
        const parameters = new Promise((resolve) => {
            get("user/parameters")
                .then((res) => {
                    this.setState({
                        covid: res.data.covid
                    })
                    resolve()
                })
        })
        const covidModules = new Promise((resolve) => {
            get("covid/covidModules")
                .then((res) => {
                    this.setState({
                        covidData: res.data.message
                    })
                    resolve()
                })
        })
        const bddapi = new Promise((resolve) => {
            get("news/bddapi")
                .then((res) => {
                    this.setState({
                        newsData: res.data
                    })
                    resolve()
                })
        })
        const requetsoneuser = new Promise((resolve) => {
            get("news/requetsoneuser")
                .then((res) => {
                    res.data.map((d) => {

                        if ((this.state.newsCountry.filter((e) => e.value === d.country)).length === 0) {
                            this.setState({
                                newsCountry: [...this.state.newsCountry, this.state.optionNewsCountry.filter((e) => e.value === d.country)[0]]
                            })
                        }
                        if ((this.state.news.filter((e) => e.value === d.country)).length === 0) {
                            if(this.state.news.filter((e) => e.value === d.category).length === 0){
                                this.setState({
                                    news: [...this.state.news, this.state.newsType.filter((e) => e.value === d.category)[0]]
                                })
                            }
                        }
                    })
                    resolve()
                })
        })
        Promise.all([allCountry, getweather, parameters, covidModules, bddapi, requetsoneuser]).then(() => {
            this.setState({
                isLoading: false
            })
        });
    }

    refreshPage = () => {
        window.location.reload(false);
    }

    updateNews = () => {
        let news = []
        this.state.news.map((n) => {
            this.state.newsCountry.map((c) => {
                news.push({
                    category: n.value,
                    country: c.value
                })
            })
        })

        if(this.state.news.length === 0 && this.state.newsCountry.length === 0){
            post("news/register", {news: news})
                .then((res) => {
                    this.refreshPage()
                })
        }
        if(news.length > 0){
            post("news/register", {news: news})
                .then((res) => {
                    this.refreshPage()
                })
        }

    }

    render() {
        return <>
            <Helmet>
                <title>MyDashboards</title>
                <meta name="description" content=""/>
            </Helmet>
            <div className="row">
                <div className="col-12 col-md-6 offset-md-3 mt-2">
                    <Autocomplete
                        freeSolo
                        multiple
                        onChange={(e, v) => {
                            if (v.length > this.state.weather.length) {
                                v.map((mod) => {
                                    if (!this.state.weather.includes(mod)) {
                                        post("weather/setCities", {cities: [{name: mod}]}).then(() => {
                                            this.refreshPage()
                                        })
                                    }
                                })
                            }
                            if (v.length < this.state.weather.length) {
                                this.state.weather.map((mod) => {
                                    if (!v.includes(mod)) {
                                        del("weather/removeCities", {cities: [{name: mod}]}).then(() => {
                                            this.refreshPage()
                                        })
                                    }
                                })
                            }
                            this.setState({
                                weather: v
                            })
                        }}

                        value={this.state.weather}
                        options={this.state.weatherCountry}
                        getOptionLabel={(option) => capitalize(option)}
                        renderInput={(params) => <TextField {...params} label="Météo" variant="outlined"/>}
                    />
                </div>
                <div className="col-12 col-md-6 offset-md-3 mt-2">
                    <Autocomplete
                        multiple
                        onChange={(e, v) => {
                            if (v.length > this.state.covid.length) {
                                v.map((mod) => {
                                    if (!this.state.covid.includes(mod)) {
                                        post("covid/covidModuleRegister", {country: mod}).then(() => {
                                            this.refreshPage()
                                        })
                                    }
                                })
                            }
                            if (v.length < this.state.covid.length) {
                                this.state.covid.map((mod) => {
                                    if (!v.includes(mod)) {
                                        del("covid/covidModulesDelete", {country: mod}).then(() => {
                                            this.refreshPage()
                                        })
                                    }
                                })
                            }
                            this.setState({
                                covid: v
                            })
                        }}
                        value={this.state.covid}
                        options={this.state.covidCountries}
                        getOptionLabel={(option) => capitalize(option)}
                        renderInput={(params) => <TextField {...params} label="Covid" variant="outlined"/>}
                    />
                </div>
                <div className="col-12 col-md-6 offset-md-3 mt-2">
                    <div className="row">
                        <div className="col-6">
                            <Autocomplete
                                multiple
                                onChange={(e, v) => {
                                    this.setState({
                                        news: v
                                    }, this.updateNews)
                                }}
                                value={this.state.news}
                                options={this.state.newsType}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} label="Type de news"
                                                                    variant="outlined"/>}
                            />
                        </div>
                        <div className="col-6">
                            <Autocomplete
                                multiple
                                onChange={(e, v) => {
                                    this.setState({
                                        newsCountry: v
                                    }, this.updateNews)
                                }}
                                value={this.state.newsCountry}
                                options={this.state.optionNewsCountry}
                                getOptionLabel={(option) => capitalize(option.name)}
                                renderInput={(params) => <TextField {...params} label="Pays" variant="outlined"/>}
                            />
                        </div>
                    </div>
                </div>
                <div className="p-5 col-12">
                    {
                        this.state.weatherData.length > 0
                            ? <div className="mt-3 row w-100 m-0">
                                <div className="col-12">
                                    <Typography variant={"h3"} component={"h1"} align={"center"}>Météo</Typography>
                                </div>
                                {
                                    this.state.weatherData.map((c) => {
                                        c = c.weather
                                        return <>
                                            {
                                                c ? <>
                                                    <div className="col-12 col-md-6 p-1">
                                                        <div className="alert alert-primary " role="alert">
                                                            <Typography variant={"p"}>{c.city}</Typography><br/>
                                                            <Typography variant={"p"}>Description
                                                                : {c.sky.description}</Typography>
                                                        </div>
                                                    </div>
                                                </> : <></>
                                            }
                                        </>
                                    })
                                }
                            </div>
                            : null
                    }


                    {
                        this.state.covidData.length > 0
                            ? <div className="mt-3 row w-100 m-0">
                                <div className="col-12">
                                    <Typography variant={"h3"} component={"h1"} align={"center"}>Information
                                        covid</Typography>
                                </div>
                                {
                                    this.state.covidData.map((c) => {
                                        return <>
                                            {
                                                c ? <>
                                                    <div className="col-12 col-md-6 p-1">
                                                        <div className="alert alert-success " role="alert">
                                                            <Typography variant={"p"}>{c.Country}</Typography><br/>
                                                            <Typography variant={"p"}>Cas confirmé : {c.Confirmed}, Nombre
                                                                de
                                                                décès
                                                                : {c.Deaths}</Typography>
                                                        </div>
                                                    </div>
                                                </> : <></>
                                            }
                                        </>
                                    })
                                }
                            </div>
                            : null
                    }
                    {
                        this.state.newsData.length > 0
                            ? <div className="mt-3 row w-100 m-0">
                                <div className="col-12">
                                    <Typography variant={"h3"} component={"h1"} align={"center"}>Informations</Typography>
                                </div>
                                {
                                    this.state.newsData.map((c) => {
                                        return <>
                                            {
                                                c.map((d) => {
                                                    return <>
                                                        <Accordion>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon/>}
                                                            >
                                                                <Typography>{d.title}</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <Typography>
                                                                    {d.content}
                                                                </Typography>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    </>
                                                })

                                            }
                                        </>
                                    })
                                }
                            </div>
                            : null
                    }

                </div>
            </div>

            <Loading open={this.state.isLoading}/>
        </>
    }
}