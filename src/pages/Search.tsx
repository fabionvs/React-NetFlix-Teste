import {Card, Carousel, Form, Pagination} from 'react-bootstrap';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, {useState, useEffect} from 'react';
import Slider from "react-slick";
import api from "../services/api";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useLocation,
    useHistory
} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Search = () => {
    let query = useQuery();
    const [popularMovies, setPopularMovies] = useState([]);
    const [genre, setGenre] = useState([]);
    const [genres, setGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPagination, setMaxPagination] = useState(1);
    const [name, setName] = useState(query.get('name') || "");
    const history = useHistory();
    useEffect(() => {
        console.log(query.get('name'))
        if (query.get('name')) {
            getMoviesByName()
        } else {
            getMoviesByGenre();
        }
        getGenres();
    }, []);

    useEffect(() => {
        getMoviesByGenre()
    }, [genre]);


    const getMoviesByGenre = async () => {
        try {
            await api.getMovieByGenres(genre, page).then(response => {
                let movies = popularMovies;
                setPopularMovies(response.data.results);
                setPage(response.data.page)
                setMaxPagination(response.data.total_pages)
            });
        } catch (error) {
            console.error(error);
        }
    };
    const getMoviesByName = async () => {
        try {
            await api.getSearch(name, page).then(response => {
                let movies = popularMovies;
                setPopularMovies(response.data.results);
                setPage(response.data.page)
                setMaxPagination(response.data.total_pages)
            });
        } catch (error) {
            console.error(error);
        }
    };
    const getGenres = async () => {
        try {
            await api.getGenreList().then(response => {
                setGenres(response.data.genres);
            });
        } catch (error) {
            console.error(error);
        }
    };

    function handleChangeName(event: any) {
        setName(event.target.value);
    }

    function submitSearch() {
        getMoviesByName()
    }

    async function handleCheckboxChange(e: any, id: any) {
        const item = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            let g = genre.concat(id);
            setGenre(g)
        } else {
            let g = genre.filter((animal) => {
                return animal !== id;
            });
            setGenre(g)
        }
    }


    return (
        <div style={{margin: 30, marginTop: 100}} className="">
            <div className="justify-content-center row">

                <div className="col-8">
                    <h3 className="ml-0 text-white">Busca de Filmes</h3>
                    <div className="row">
                        {popularMovies.length > 0 && popularMovies.map((movie: any) => (
                            <div className="col-md-4">
                                <Link to={{
                                    pathname: '/movie/' + movie.id,
                                }}>
                                    <Card onMouseEnter={() => {
                                    }} className="bg-dark text-white img-gradient"
                                          style={{margin: 5}}>
                                        <Card.Img
                                            src={(movie.poster_path != null) ? 'https://image.tmdb.org/t/p/w500/' + movie.poster_path : "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/2022/no-image.png"}
                                            className="img-gradient"
                                            style={styles.imgRodape}
                                            alt="Card image"/>
                                        <Card.ImgOverlay style={{zIndex: 100}}>
                                            <div style={{position: "absolute", bottom: 0, marginBottom: 20}}>
                                                <Card.Title>{movie.title}</Card.Title>
                                                <Card.Text>
                                                    {movie.overview != null && movie.overview.slice(0, 150)}...
                                                </Card.Text>
                                            </div>
                                        </Card.ImgOverlay>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                        <div className="col-12 mt-5">
                            <div className="d-flex justify-content-center">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item"><a className="page-link" onClick={() => setPage(1)}
                                                                     href="#">Primeira</a></li>
                                        {page > 1 && <li className="page-item"><a className="page-link"
                                                                                  onClick={() => setPage(page - 1)}
                                                                                  href="#">Anterior</a></li>}
                                        {page > 2 && <li className="page-item"><a className="page-link"
                                                                                  onClick={() => setPage(page - 2)}
                                                                                  href="#">{page - 2}</a></li>}
                                        {page > 1 && <li className="page-item"><a className="page-link"
                                                                                  onClick={() => setPage(page - 1)}
                                                                                  href="#">{page - 1}</a></li>}
                                        <li className="page-item active"><a className="page-link" href="#">{page}</a>
                                        </li>
                                        {page < maxPagination - 1  && <li className="page-item"><a className="page-link "
                                                                                    onClick={() => setPage(page + 1)}
                                                                                    href="#">{page + 1}</a></li>}
                                        {page < maxPagination - 1 && <li className="page-item"><a className="page-link"
                                                                                    onClick={() => setPage(page + 2)}
                                                                                    href="#">{page + 2}</a></li>}
                                        {page < maxPagination - 1 && <li className="page-item"><a className="page-link"
                                                                                    onClick={() => setPage(page + 3)}
                                                                                    href="#">Pŕoxima</a></li>}
                                        <li className="page-item"><a className="page-link" href="#"
                                                                     onClick={() => setPage(maxPagination)}>Última</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="card o-hidden bg-dark" style={{marginTop: "20%"}}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card-body">
                                    <h5
                                        className="card-title mb-2"> Procurar
                                    </h5>
                                    <div className="form-group">
                                        <div className="search-bar">
                                            <label>Digite o nome do filme ou série</label>
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                value={name}
                                                onChange={handleChangeName}
                                                onClick={function () {
                                                    setName("")
                                                }}
                                                onBlur={submitSearch}
                                                className="form-control ng-untouched ng-pristine ng-valid bg-dark"/>
                                        </div>
                                    </div>
                                    <hr/>
                                    <h5
                                        className="card-title mb-2"> Gêneros
                                    </h5>
                                    {genres.length > 0 && genres.map((list: any) => (
                                        <Form.Check
                                            custom
                                            type={'checkbox'}
                                            value={list.id}
                                            id={`custom-${list.id}`}
                                            label={list.name}
                                            name="genre"
                                            onChange={function (e) {
                                                handleCheckboxChange(e, list.id)
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
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
export default Search;
