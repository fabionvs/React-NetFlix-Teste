import {Card, Carousel} from 'react-bootstrap';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as moment from 'moment'
import React, {useState, useEffect} from 'react';
import Slider from "react-slick";
import api from "../services/api";
import {useHistory, useParams} from "react-router";
import ReactPlayer from 'react-player'

const Movie = () => {
    const [movie, setMovie] = useState({
        title: null,
        genres: [],
        homepage: null,
        overview: null,
        original_language: null,
        original_title: null,
        backdrop_path: null,
        release_date: null,
        spoken_languages: [{name: null}],
        video: false,
        poster_path: null,
        runtime: null
    });
    const [video, setVideo] = useState({key: null});
    const history = useHistory();
    let params: any = useParams();
    useEffect(() => {
        getMovie()
        getVideo()
    }, []);

    const getMovie = async () => {
        try {
            await api.getMovie(params.id).then(response => {
                setMovie(response.data);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getVideo = async () => {
        try {
            await api.getVideos(params.id).then(response => {
                setVideo(response.data.results[0]);
            });
        } catch (error) {
            console.error(error);
        }
    };


    function FormatDate(date: any) {
        return date;
    }


    return (
        <div>
            <div style={{zIndex: 0}}>
                <div className="container" style={styles.container}>
                    <div className="card bg-dark">
                        <div>
                            {video != null &&
                            <div className="embed-responsive embed-responsive-16by9" style={styles.height600}>
                                <ReactPlayer
                                    url={"https://youtu.be/" + video.key}
                                />
                            </div>}
                            {video == null && movie.poster_path != null &&
                            <img style={styles.height600}
                                 src={(movie.poster_path != null) ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path : "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/2022/no-image.png"}
                                 className="card-img-top" alt="teste"/>}
                        </div>
                        {movie != null &&

                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">{movie.title}</h6>
                            <p className="card-text">{movie.overview}</p>
                            <table className="table table-dark">
                                <tbody>
                                <tr>
                                    <td>Nome</td>
                                    <td>{movie.title}</td>
                                </tr>
                                <tr>
                                    <td>Nome Original</td>
                                    <td>{movie.original_title}</td>
                                </tr>
                                <tr>
                                    <td>Linguas</td>
                                    <td>{movie.spoken_languages.map(function (item, i) {
                                        return (i > 0) ? ", " + item?.name : "" + item?.name;
                                    })}</td>
                                </tr>
                                <tr>
                                    <td>Data</td>
                                    <td>{movie.release_date}</td>
                                </tr>
                                <tr>
                                    <td>Tem video?</td>
                                    <td>{(movie.video === true) ? "Sim" : "Não"}</td>
                                </tr>
                                <tr>
                                    <td>Duração</td>
                                    <td>{movie.runtime} minutos</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        marginTop: 200,
        marginBottom: 200
    },
    movie: {
        width: "100%",
    },
    imgRodape: {
        maxHeight: 200,
        backgroundImage: "linear-gradient(#e66465, #9198e5);"
    },
    height600: {
        maxHeight: 600
    }
};

export default Movie;
