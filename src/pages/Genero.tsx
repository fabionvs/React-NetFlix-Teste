import {Card, Carousel} from 'react-bootstrap';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {Link} from "react-router-dom";

import React, {useState, useEffect} from 'react';
import Slider from "react-slick";
import api from "../services/api";
import {useParams} from "react-router";


const Genero = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [genre, setGenre] = useState();
    const [page, setPage] = useState(1);
    useEffect(() => {
        getPopularMovies();
        getGenres();
    }, []);
    let params: any = useParams();


    const getPopularMovies = async () => {
        try {
            await api.getMovieByGenres(params.id, page).then(response => {
                let movies = popularMovies;
                setPopularMovies(response.data.results);
                setPage(page + 1)
            });
        } catch (error) {
            console.error(error);
        }
    };
    const getGenres = async () => {
        try {
            await api.getGenreList().then(response => {
                let newValue = response.data.genres.filter((number: any) => number.id == params.id);
                setGenre(newValue[0].name);
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <div style={{margin: 30, marginTop: 100}} className="container">
                <h3 className="ml-0 text-white">Filmes Recomendados - {genre}</h3>
                <div className="row">
                    {popularMovies.map((movie: any) => (
                        <div className="com-md-3">
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
                                    <Card.ImgOverlay style={{zIndex: 100}}>
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
                </div>
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
};

export default Genero;
