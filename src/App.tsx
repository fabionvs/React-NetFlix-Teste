import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {Navbar, Nav, NavDropdown, NavLink} from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory,
    Redirect
} from "react-router-dom";
import api from "../src/services/api";

import React, {useEffect, useState} from "react";
import Routes from "./components/Routes/Routes";
import Image from "react-bootstrap/Image";


const Header = () => {
    const [genres, setGenres] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const color = (scrollTop > 300) ? "#fff" : "#000"
    const getGenres = async () => {
        try {
            await api.getGenreList().then(response => {
                setGenres(response.data.genres);
            });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', (event: any) => {
            setScrollTop(window.pageYOffset);
        });
    }, [scrollTop]);
    useEffect(() => {
        getGenres()
    }, []);
    return (
        <Navbar collapseOnSelect expand="lg" bg={(scrollTop > 300) ? "dark" : "transparent"} variant="dark" style={{
            position: "fixed",
            width: "100%",
            top: 0,
            zIndex: 9999,
            backgroundColor: (scrollTop > 300) ? "#282c34" : "transparent",
            color: color,
            fontSize: 16,
            letterSpacing: 2
        }}>
            <Navbar.Brand href="#home"><Image src={process.env.PUBLIC_URL + "/images/logo.png"}
                                              style={{maxHeight: 50}}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Início</Nav.Link>
                    <NavDropdown title="Filmes" id="collasible-nav-dropdown">
                        <h5 className="ml-4">Gêneros de Filmes</h5>
                        <div className="row" style={{width: "800px"}}>
                            {genres.map((genre: any) => (
                                <div className="col-4">
                                    <NavDropdown.Item href={'/genero/' + genre.id}>{genre.name}</NavDropdown.Item>
                                </div>
                            ))}
                        </div>
                    </NavDropdown>
                    <Nav.Link href="/search">Buscar</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

const App: React.FC = () => {

    return (
        <div className="App">
            <Header/>
            <Routes/>
        </div>
    );
};

export default App;
