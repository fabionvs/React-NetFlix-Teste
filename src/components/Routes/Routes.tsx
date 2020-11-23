import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Home from "../../pages/Home"
import Genero from "../../pages/Genero"
import Search from "../../pages/Search";
import Movie from "../../pages/Movie";
const Routes = () => (
    <BrowserRouter>
        <Route exact path="/" component={Home}/>
        <Route exact path="/genero/:id" component={Genero}/>
        <Route exact path="/movie/:id" component={Movie}/>
        <Route exact path="/search" component={Search}/>
    </BrowserRouter>
);

export default Routes;
