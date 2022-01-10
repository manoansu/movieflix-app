import { Router, Switch, Route } from "react-router-dom";
import history from "util/history";
import Navbar from "./components/Navbar";
import Home from "./page/Home";
import Member from "./page/Member";

import MovieDatails from "./page/MovieDetails";


const Routes = () =>  (

    <Router history={history}>
        <Navbar />
        <Switch>
            <Route path="/" exact> 
                <Home />
            </Route>
            <Route path="/movies" exact>
                <Member />
            </Route>
            <Route path="/movies/:movieId">
                <MovieDatails />
            </Route>
        </Switch>
    </Router>

);
export default Routes; 