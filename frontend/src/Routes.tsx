import Catalog from "page/Catalog";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "util/history";
import Navbar from "./components/Navbar";
import Home from "./page/Home";
import Member from "./page/Member";
import Auth from "./page/Member/Auth";
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
            <Route path="/movie" exact>
                <Catalog />
            </Route>
            <Route path="/movies/:movieId">
                <MovieDatails />
            </Route>
            <Redirect from="/movie/auth" to="/movie/auth/login" exact />
            <Route path="/movie/auth"exact>
                <Auth />
            </Route>
           
        </Switch>
    </Router>

);
export default Routes; 