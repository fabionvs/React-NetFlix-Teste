import {Card, Carousel} from 'react-bootstrap';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, {useState, useEffect} from 'react';
import Slider from "react-slick";
import api from "../services/api";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

var settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    centerPadding: "60px",
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [latestMovies, setLatestMovies] = useState([]);
    const [name, setName] = useState("");
    const history = useHistory();
    useEffect(() => {
        getPopularMovies()
        getUpcomingMovies()
        getLatestMovies()
    }, []);


    const getUpcomingMovies = async () => {
        try {
            await api.getUpcomingMovies().then(response => {
                setUpcomingMovies(response.data.results);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getLatestMovies = async () => {
        try {
            await api.getUpcomingMovies().then(response => {
                setLatestMovies(response.data.results);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getPopularMovies = async () => {
        try {
            await api.getMovieList().then(response => {
                setPopularMovies(response.data.results);
            });
        } catch (error) {
            console.error(error);
        }
    };

    function handleChange(event: any) {
        setName(event.target.value);
        console.log('foi')
    }

    function handleSubmit(event: any) {
        history.push({
            pathname: '/search',
            search: '?name=' + name,
        })
    }

    return (
        <div>
            <div style={{zIndex: 0}}>
                <Carousel style={styles.slider} controls={false}>
                    {upcomingMovies.map((movie: any) => (
                        <Carousel.Item className="img-gradient2">
                            <img style={styles.sliderImg}
                                 className="d-block w-100 shadow-lg"
                                 src={(movie.poster_path != null) ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path : "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/2022/no-image.png"}
                                 alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>Lançamento: {movie.title}</h3>
                                <p>{movie.overview}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <div className="main-text hidden-xs">
                    <div className="col-md-4 offset-2">
                        <div className="card o-hidden bg-dark" style={{marginTop: "20%"}}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card-body"><h5
                                        className="card-title mb-2"><i
                                        className="iconsminds-map-marker-2"></i> Procurar
                                    </h5>
                                        <form id="input-search"
                                              className="ng-tns-c149-0 ng-untouched ng-pristine ng-invalid">
                                            <div className="form-group">
                                                <div className="search-bar">
                                                    <label>Digite o nome do filme ou série</label>
                                                    <input
                                                        onInput={handleChange}
                                                        type="text"
                                                        placeholder="Search"
                                                        className="form-control ng-untouched ng-pristine ng-valid bg-dark"/>
                                                </div>
                                            </div>
                                            <div className="form-group pt-2"></div>
                                            <button className="btn btn-primary btn-rounded btn-block mt-3"
                                                    onClick={handleSubmit}>
                                                <span className="ng-star-inserted"> Procurar </span></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={styles.divSpace}>
                <h5 className="ml-3 text-white">Filmes Recomendados</h5>
                <Slider {...settings}>
                    {popularMovies.map((movie: any) => (
                        <div>
                            <Link to={{
                                pathname: '/movie/' + movie.id,
                            }}>
                                <Card onMouseEnter={() => {
                                }} className="bg-dark text-white img-gradient"
                                      style={{margin: 5}}>
                                    <Card.Img
                                        src={(movie.poster_path != null) ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path : "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/2022/no-image.png"}
                                        className="img-gradient hover-zoom"
                                        style={styles.imgRodape}
                                        alt="Card image"/>
                                    <Card.ImgOverlay style={styles.index9999}>
                                        <div style={{position: "absolute", bottom: 0, marginBottom: 20}}>
                                            <Card.Title>{movie.title}</Card.Title>
                                            <Card.Text>
                                                {movie.overview.slice(0, 150)}...
                                            </Card.Text>
                                        </div>
                                    </Card.ImgOverlay>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
            <div style={styles.divSpace}>
                <h5 className="ml-3 text-white">Últimos</h5>
                <Slider {...settings}>
                    {latestMovies.map((movie: any) => (
                        <div>
                            <Link to={{
                                pathname: '/movie/' + movie.id,
                            }}>
                                <Card onMouseEnter={() => {
                                }} className="bg-dark text-white img-gradient"
                                      style={{margin: 5}}>
                                    <Card.Img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
                                              className="img-gradient"
                                              style={styles.imgRodape}
                                              alt="Card image"/>
                                    <Card.ImgOverlay style={{zIndex: 9999}}>
                                        <div style={{position: "absolute", bottom: 0, marginBottom: 20}}>
                                            <Card.Title>{movie.title}</Card.Title>
                                            <Card.Text>
                                                {movie.overview.slice(0, 150)}...
                                            </Card.Text>
                                        </div>
                                    </Card.ImgOverlay>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
        ;
};

const styles = {
    sliderImg: {
        width: "100%",
        maxHeight: 800,
    },
    slider: {
        width: "100%",
    },
    imgRodape: {
        maxHeight: 200,
        backgroundImage: "linear-gradient(#e66465, #9198e5);"
    },
    divSpace: {
        margin: 30,
        marginTop: 10
    },
    index9999: {
        zIndex: 9999
    }
};

export default Home;
