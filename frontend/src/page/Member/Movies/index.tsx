import { List } from "react-content-loader";
import { Route, Switch } from "react-router-dom";
import Form from "./Form";

const Movies = () =>{

    return(
        <Switch>
            <Route path="/admin/products" exact >
                <List />
            </Route>
            <Route path="/admin/movies/:movieId">
                <Form />
            </Route>
        </Switch>
    )
};

export default Movies;